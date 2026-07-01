# Components

Main UI is split by app module:

- `HomeScreen.jsx` - home menu and quote card
- `LoadingSimulator.jsx` - truck loading simulator, trailer, cargo types, saved loads
- `ScannerModule.jsx` - QR scanning table and Marija email/export actions
- `TransferModule.jsx` - material transfer entries and transfer email/export actions
- `InventoryModule.jsx` - inventory, counting, inventory photos
- `HistoryModule.jsx` - global history, search, backup/restore
- `TimeModule.jsx` - work shift clock
- `InstructionModal.jsx` - module-specific instructions
- `SharedLoadView.jsx` - shared saved trailer view

`App.jsx` still owns shared state and business actions. New module-specific features should now be added in the relevant component file, while shared helper logic should go into `src/utils/`.
