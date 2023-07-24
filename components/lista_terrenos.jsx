"use client"
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { allTerrenos }  from '../lib/postgraphile'
import { deleteTerreno }  from '../lib/postgraphile'
import { DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Area',
    dataIndex: 'area',
    key: 'area',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Valor Comercial',
    dataIndex: 'valorComercial',
    key: 'valorComercial',
  },
  {
    title: 'Tipo Terreno',
    dataIndex: 'tipoTerreno',
    key: 'tipoTerreno',
  },
  {
    title: 'Fuentes de Aguan',
    dataIndex: 'fuenteAgua',
    key: 'fuenteAgua',
  },
  {
    title: 'Tiene Construcciones',
    dataIndex: 'tieneConstrucciones',
    key: 'tieneConstrucciones',
  },
  {
    title: 'Predio',
    dataIndex: 'predio',
    key: 'predio',
  },
  {
    title: 'Accion',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEliminar(record.nodeId)}>Eliminar <DeleteOutlined /> </a>
      </Space>
    ),
  },
];

  const handleEliminar = (nodeId) => {
    try{
        deleteTerreno(nodeId);
        window.location.reload();
    }catch(error){
        console.log(error)
    }
  };

const App = () => {
  const [informacion, setInformacion] = useState('');

  useEffect(() => {
    async function fetchData() {
    const data = await allTerrenos();
    const mapData = data.map((item, index) => ({
      key: index,
      area: item.areaTerreno,
      valorComercial: item.valorComercial,
      tipoTerreno: item.tipoTerrenoByIdTipoTerreno.tipoTerreno,
      fuenteAgua: item.fuenteAguaCercana ? "Si":"No",
      tieneConstrucciones: item.tieneConstruncciones ? "Si":"No",
      predio: item.predioByPredioId?.nombre,
      nodeId: item.nodeId,
    }));
    setInformacion(mapData);
    }
    fetchData();
  }, []);

  const paginationConfig = {
    pageSize: 10, 
  };

  return(<Table columns={columns} dataSource={informacion} pagination={paginationConfig}/>)
};
export default App;