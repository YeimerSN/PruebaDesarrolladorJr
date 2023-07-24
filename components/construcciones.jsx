import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Select, Form, Input } from 'antd';
import { obtenerTipoConstrucciones }  from '../lib/postgraphile'
import { createConstruccion }  from '../lib/postgraphile'
import { predios } from '../lib/postgraphile'

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App = () => {
    const [tiposConstrucciones, setTiposConstrucciones] = useState([]);
    const [predio, setPredio] = useState([]);
    const [predioId, setIdPredio] = useState('');
    const [areaTotal, setAreaTotal] = useState('');
    const [numeroPisos, setCantidadPisos] = useState('');
    const [idTipoContruccion, setIdTipoConstruccion] = useState('');
    const [direccion, setDireccion] = useState('');


    useEffect(() => {
        async function fetchData() {
          const data = await obtenerTipoConstrucciones();
          const predio = await predios();
          setTiposConstrucciones(data);
          setPredio(predio)
        }
    
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await createConstruccion(parseInt(areaTotal), direccion, parseInt(numeroPisos), parseInt(idTipoContruccion), predioId);
        } catch (error) {
          console.log(error)
        }
    };

    return (
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
            label="Cantidad de pisos"
            name="cantidad_pisos"
            rules={[
                {
                required: true,
                message: 'Ingresa el # de pisos',
                },
            ]}
            >
            <Input type='number' value={numeroPisos} onChange={(e) => setCantidadPisos(e.target.value)} />
            </Form.Item>

            <Form.Item
            label="Area total"
            name="area_total"
            rules={[
                {
                required: true,
                message: 'Ingresa el area total',
                },
            ]}
            >
            <Input type='number' value={areaTotal} onChange={(e) => setAreaTotal(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Tipo de construccion"
                name="tipo_construccion"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona el tipo de construccion'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el tipo de construccion"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={idTipoContruccion}
                    onChange={(e) => setIdTipoConstruccion(e)}
                    >
                    {tiposConstrucciones.map((tiposConstrucciones) => (
                        <Select.Option key={tiposConstrucciones.idTipoConstruccion} value={tiposConstrucciones.idTipoConstruccion}>
                            {tiposConstrucciones.tipoConstruccion}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
            label="Direccion"
            name="direccion"
            rules={[
                {
                required: true,
                message: 'Ingresa la direccion',
                },
            ]}
            >
            <Input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Predio"
                name="predio"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona el predio relacionado'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el predio"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={predio}
                    onChange={(e) => setIdPredio(e)}
                    >
                    {predio.map((predio) => (
                        <Select.Option key={predio.numeroPredial} value={predio.numeroPredial}>
                            {predio.nombre}
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
    );
};
export default App;
