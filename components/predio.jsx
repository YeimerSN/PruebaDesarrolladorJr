"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Select, Form, Input, Checkbox } from 'antd';
import { obtenerDepartamentos }  from '../lib/postgraphile'
import { obtenerMunicipiosById }  from '../lib/postgraphile'
import { createPredio }  from '../lib/postgraphile'

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const obtenerNodeId = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id");
};

const App = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [municipios, setMunicipios] = useState([]);
    const [avaluo, setAvaluo] = useState('');
    const [minicipioId, setMunicipiosId] = useState('');
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        async function fetchData() {
          const data = await obtenerDepartamentos();
          setDepartamentos(data);
        }
      
        fetchData();
      }, []);

    useEffect(() => {
        async function fetchMunicipios() {
        if (selectedDepartamento !== '') {
            const data = await obtenerMunicipiosById(parseInt(selectedDepartamento));
            setMunicipios(data);
        }
        }
        fetchMunicipios();
    }, [selectedDepartamento]);

    const handleDepartamentoChange = (event) => {
        setSelectedDepartamento(event);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await createPredio(parseInt(avaluo), parseInt(minicipioId), nombre);
        } catch (error) {
          console.log(error)
        }
    };
    

    return (
        <section>
            <Form
            name="basic"
            labelCol={{
            span: 10,
            }}
            wrapperCol={{
            span: 100,
            }}
            style={{
            maxWidth: 800,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onSubmitCapture={handleSubmit}
        >
            <Form.Item
            label="Avaluo"
            name="avaluo"
            rules={[
                {
                required: true,
                message: 'Ingresa el avaluo del predio',
                },
            ]}
            >
            <Input type='number' value={avaluo} onChange={(e) => setAvaluo(e.target.value)} />
            </Form.Item>

            <Form.Item
            label="Nombre"
            name="nombre"
            rules={[
                {
                required: true,
                message: 'Ingresa el nombre del predio',
                },
            ]}
            >   
            <Input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Departamento"
                name="departamento"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona el departamento'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el departamento"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={handleDepartamentoChange}
                    >
                    {departamentos.map((departamento) => (
                    <Select.Option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                        {departamento.nombre}
                    </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Municipio"
                name="municipio"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona un municipio'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el municipio"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={minicipioId}
                    onChange={(e) => setMunicipiosId(e)}
                    >
                    {municipios.map((municipios) => (
                        <Select.Option key={municipios.idMunicipio} value={municipios.idMunicipio}>
                            {municipios.nombre}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

                       
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
        </section>
        

    );
};
export default App;