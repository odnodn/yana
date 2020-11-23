import * as React from 'react';
import { SpotlightManager, SpotlightTransition } from '@atlaskit/onboarding';
import { SpotlightScenarioId } from './SpotlightScenarioId';
import { useContext, useEffect, useState } from 'react';
import { SidebarScenario } from './scenarios/SidebarScenario';
import { SpotlightScenario, SpotlightStepComponent } from './SpotlightScenario';
import { useAppData } from '../../appdata/AppDataProvider';
import { useTelemetry } from '../telemetry/TelemetryProvider';
import { TelemetryEvents } from '../telemetry/TelemetryEvents';

export interface SpotlightContextValue {
  startScenario: (scenario: SpotlightScenarioId, force?: boolean) => void,
}

export const SpotlightContext = React.createContext<SpotlightContextValue>(null as any);

export const useSpotlight = () => useContext(SpotlightContext);

export const SpotlightContainer: React.FC<{}> = props => {
  const appData = useAppData();
  const [scenario, setScenario] = useState<SpotlightScenarioId | undefined>();
  const [step, setStep] = useState(0);
  const telemetry = useTelemetry();

  useEffect(() => {
    if (!appData.settings.completedSpotlights.includes(SpotlightScenarioId.SidebarScenario)) {
      setStep(0);
      setScenario(SpotlightScenarioId.SidebarScenario);
    }
  }, [])

  return (
    <SpotlightManager>
      <SpotlightContext.Provider value={{
        startScenario: (scenarioId, force) => {
          if (force || !appData.settings.completedSpotlights.includes(scenarioId)) {
            setStep(0);
            setScenario(scenarioId);
          }

          if (force) {
            telemetry.trackEvent(...TelemetryEvents.Tutorial.restart);
          }
        }
      }}>
        { props.children }

        { scenario && (
          <SpotlightTransition>
            { (() => {
              let scenarioObj: SpotlightScenario;

              switch (scenario) {
                case SpotlightScenarioId.SidebarScenario:
                  scenarioObj = SidebarScenario;
                  break;
                default:
                  return null;
              }

              const Comp = scenarioObj.steps[step];
              const nextStep = () => setStep(s => Math.min(scenarioObj.steps.length - 1, s + 1));
              const prevStep = () => setStep(s => Math.max(0, s - 1));
              const completeScenario = async () => {
                await appData.saveSettings({ ...appData.settings, completedSpotlights: [...appData.settings.completedSpotlights, scenario] });
              }

              return (
                <Comp
                  nextStep={nextStep}
                  previousStep={prevStep}
                  defaultActions={[
                    step === scenarioObj.steps.length - 1 && { text: 'Got it!', onClick: async () => {
                      await completeScenario();
                      setScenario(undefined);
                      setStep(0);
                      telemetry.trackEvent(...TelemetryEvents.Tutorial.complete);
                    }},
                    step < scenarioObj.steps.length - 1 && { text: 'Next', onClick: nextStep },
                    step > 0 && { text: 'Back', onClick: prevStep },
                    step === 0 && { text: 'Skip tutorial', onClick: async () => {
                      await completeScenario();
                      setScenario(undefined);
                      setStep(0);
                      telemetry.trackEvent(...TelemetryEvents.Tutorial.skip);
                    }},
                  ].filter(x => !!x) as any}
                />
              );
            })() }
          </SpotlightTransition>
        )}
      </SpotlightContext.Provider>
    </SpotlightManager>
  );
};
