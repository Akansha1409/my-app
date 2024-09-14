import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { fetchArtworks } from '../api/apiService';
import { ProgressSpinner } from 'primereact/progressspinner';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const DataTableComponent = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
  const [selectionMap, setSelectionMap] = useState<{ [key: string]: boolean }>({});
  const rowsPerPage = 10;

  const fetchData = async (page: number = 1) => {
    setLoading(true);
    const response = await fetchArtworks(page);
    setArtworks(response.data);
    setTotalRecords(response.pagination.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1); // Fetch the first page initially
  }, []);

  const onPageChange = (e: any) => {
    fetchData(e.page + 1); // Fetch respective page data
  };

  const onSelectionChange = (e: any) => {
    const selected = e.value;
    const updatedMap = { ...selectionMap };

    // Update selection map for persistence
    selected.forEach((row: Artwork) => {
      updatedMap[row.id] = true;
    });

    setSelectedRows(selected);
    setSelectionMap(updatedMap);
  };

  const isRowSelected = (row: Artwork) => {
    return selectionMap[row.id] || false;
  };

  return (
    <div>
      {loading ? (
        <ProgressSpinner />
      ) : (
        <DataTable
          value={artworks}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          onPage={onPageChange}
          selection={selectedRows}
          onSelectionChange={onSelectionChange}
          selectionMode="multiple"
          dataKey="id"
          className="p-datatable-striped p-datatable-hover custom-datatable"
          rowClassName={(row) => ({ 'p-highlight': isRowSelected(row) })} // Highlight selected rows
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
          <Column field="title" header="Title" style={{ minWidth: '150px' }}></Column>
          <Column field="place_of_origin" header="Place of Origin"></Column>
          <Column field="artist_display" header="Artist"></Column>
          <Column field="inscriptions" header="Inscriptions"></Column>
          <Column field="date_start" header="Date Start"></Column>
          <Column field="date_end" header="Date End"></Column>
        </DataTable>
      )}
    </div>
  );
};

export default DataTableComponent;




