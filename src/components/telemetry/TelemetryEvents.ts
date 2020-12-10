export const TelemetryEvents = {
  App: {
    init: ['app', 'application_initialize'],
  },
  Notes: {
    saveChanges: ['notes', 'notes_save_changes'],
    saveChangesViaTimer: ['notes', 'notes_save_changes_via_timer'],
    saveChangesViaTabSwitch: ['notes', 'notes_save_changes_via_tabswitch'],
    saveChangesViaContextSwitch: ['notes', 'notes_save_changes_via_contextswitch'],
    saveChangesViaAppClose: ['notes', 'notes_save_changes_via_appclose'],
    openNote: ['notes', 'notes_open'],
  },
  Items: {
    changeTags: ['items', 'items_change_tags'],
    renameFromSidebar: ['items', 'items_rename_from_sidebar'],
    renameFromAlert: ['items', 'items_rename_from_alert'],
    move: ['items', 'items_move'],
    copy: ['items', 'items_copy'],
    moveToTrash: ['items', 'items_move_to_trash'],
    restoreFromTrash: ['items', 'items_restore_from_trash'],
    removeFromTrash: ['items', 'items_remove_from_trash'],
    createCollection: ['items', 'items_create_collection'],
    createAtlaskitNote: ['items', 'items_create_atlaskit_note'],
    createCodeSnippet: ['items', 'items_create_code_snippet'],
    createTodoList: ['items', 'items_create_todolist'],
    createDraftItem: ['items', 'items_create_draft'],
    starFromNoteContainer: ['items', 'items_star_from_notecontainer'],
    starFromContextMenu: ['items', 'items_star_from_contextmenu'],
    unStarFromNoteContainer: ['items', 'items_unstar_from_notecontainer'],
    unStarFromContextMenu: ['items', 'items_unstar_from_contextmenu'],
  },
  Search: {
    performSearch: ['search', 'search_perform'],
  },
  Tutorial: {
    skip: ['tutorial', 'tutorial_skip'],
    complete: ['tutorial', 'tutorial_complete'],
    restart: ['tutorial', 'tutorial_restart'],
  },
  Backups: {
    performBackup: ['backup', 'backup_perform'],
  },
  Updates: {
    // performUpdate: ['update', 'update_perform']
  },
  Settings: {
    saveSettings: ['settings', 'settings_save'],
    chooseTheme: ['settings', 'settings_choose_theme']
  },
  Workspaces: {
    create: ['workspaces', 'workspaces_create'],
    switch: ['workspaces', 'workspaces_switch'],
    deleteFromDisk: ['workspaces', 'workspaces_delete_from_disk'],
    deleteFromYana: ['workspaces', 'workspaces_delete_from_yana'],
    // export: ['workspaces', 'workspaces_export'],
    import: ['workspaces', 'workspaces_import'],
    addExisting: ['workspaces', 'workspaces_add_existing'],
  },
  SqliteDatasource: {
    persist: ['dssqlite', 'ds_persist'],
    persistFailed: ['dssqlite', 'ds_persist_failed'],
    storeMediaContent: ['dssqlite', 'ds_store_media_content'],
    performSearch: ['dssqlite', 'ds_search_perform'],
    changeItem: ['dssqlite', 'ds_change_item'],
    removeItem: ['dssqlite', 'ds_remove_item'],
    createItem: ['dssqlite', 'ds_create_item'],
    loadFailedBackupFine: ['dssqlite', 'ds_loading_failed_backup_fine'],
    loadFailedBackupBroken: ['dssqlite', 'ds_loading_failed_backup_failed'],
    loadSuccess: ['dssqlite', 'ds_loading_success']
  }
} as const;