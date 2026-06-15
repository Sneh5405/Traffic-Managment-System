# Components

This folder contains all the React components organized by category.

## Folder Structure

```
components/
├── index.js          # Main export file for clean imports
├── layout/           # Layout-related components
│   ├── TopAppBar.jsx # Application header with navigation
│   └── Sidebar.jsx   # Right sidebar with city overview and sector summary
├── map/              # Map-related components
│   ├── MapPanel.jsx  # Main map display with road network and sensors
│   └── SensorPopup.jsx # Popup component for sensor information
└── ui/               # Reusable UI components
    └── SectorCard.jsx # Card component for sector information
```

## Components Description

### Layout Components

- **TopAppBar**: Fixed header with navigation and settings button
- **Sidebar**: Collapsible right sidebar with city overview and sector data

### Map Components

- **MapPanel**: Interactive map showing road network, sectors, and sensor nodes
- **SensorPopup**: Information popup for individual sensors (e.g., "Sector 2 Central Crossing")

### UI Components

- **SectorCard**: Reusable card component displaying sector traffic and pollution data

## Features

- **Sidebar Toggle**: The sidebar can be opened/closed using the toggle button
- **Modular Design**: Each component is self-contained and reusable
- **Responsive**: Components adapt to different screen sizes
- **Clean Imports**: Use the index.js file for organized imports
