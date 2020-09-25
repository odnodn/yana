import * as React from 'react';
import { WorkSpaceSelection } from './WorkSpaceSelection';
import { SideBarTree } from './SideBarTree';
import { Button } from '@blueprintjs/core';
import { DataItemKind } from '../../types';
import { useEffect } from 'react';
import { useDataSearch } from '../../datasource/useDataSearch';
import { useDataInterface } from '../../datasource/DataInterfaceContext';
import { InternalTag } from '../../datasource/InternalTag';
import { SideBarTreeOnIds } from './SideBarTreeOnIds';

export const SideBarContent: React.FC<{}> = props => {
  const dataInterface = useDataInterface();
  const [rootCollection] = useDataSearch({ tags: [InternalTag.WorkspaceRoot] });
  const rootChilds = useDataSearch(rootCollection ? { parents: [rootCollection.id] } : {})
  console.log("rootchilds", rootCollection, rootChilds)

  useEffect(() => console.log(`Changed rootCollection`, rootCollection), [rootCollection])

  const dummyItemContent = { childIds: [], kind: DataItemKind.NoteItem, tags: [], lastChange: 0, created: 0, };

  return (
    <>
      <WorkSpaceSelection />

      <SideBarTree
        title="Yana"
        rootItems={[
          { id: '__home', name: 'Home', ...dummyItemContent },
          { id: '__starred', name: 'Starred', ...dummyItemContent },
          { id: '__files', name: 'Files', ...dummyItemContent },
          { id: '__drafts', name: 'Drafts', ...dummyItemContent },
          { id: '__allitems', name: 'All Items', ...dummyItemContent },
        ]}
      />

      {
        rootChilds.map(rootChild => (
          <SideBarTreeOnIds
            key={rootChild.id}
            title={rootChild.name}
            rootItems={rootChild.childIds}
            masterItem={rootChild}
          />
        ))
      }
    </>
  );
};



// <Button onClick={() => dataInterface.createDataItem({
//   kind: DataItemKind.Collection,
//   name: 'New Collection',
//   tags: [],
//   childIds: [],
//   created: new Date().getTime(),
//   lastChange: new Date().getTime()
// })}>
//   New Collection
// </Button>