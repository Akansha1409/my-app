import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import DataTableComponent from './components/DataTableComponent';
import './App.css'; // Updated Custom styles
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Artworks Directory</h1>
        <p>Explore and manage your artwork collection with pagination and row selection.</p>
        <Button label="Refresh Data" icon="pi pi-refresh" className="p-button-rounded refresh-btn" onClick={() => window.location.reload()} />
      </header>

      <Card className="data-card">
        <div className="table-header">
          <h2>Artworks Table</h2>
          <Button label="View Selection" icon="pi pi-eye" className="p-button-outlined view-btn" onClick={toggleModal} />
        </div>
        <DataTableComponent />
      </Card>

      <Dialog header="Selected Artwork Details" visible={isModalVisible} style={{ width: '50vw' }} onHide={toggleModal}>
        <p>Details of the selected artwork will appear here.</p>
      </Dialog>

      <footer className="app-footer">
        <p>Powered by PrimeReact & Art Institute of Chicago API</p>
      </footer>
    </div>
  );
}

export default App;

