import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

//Obteniendo los datos de los departamentos
export async function obtenerDatos() {
    const resultado = await client.query({
    query: gql`
      query {
        allDepartamentos {
          nodes {
            idDepartamento
            nombre
          }
        }
      }
    `,
  });

  return resultado.data.allDepartamentos.nodes;
}

//Obteniendo los tipos de terrenos
export async function obtenerTipoTerreno(){
  const resultado = await client.query({
    query: gql`
      query {
        allTipoTerrenos {
          nodes {
            idTipoTerreno
            tipoTerreno
          }
        }
      }
    `
  });
  return resultado.data.allTipoTerrenos.nodes;
}

//Tipos de construcciones
export async function obtenerTipoConstrucciones(){
  const resultado = await client.query({
    query: gql`
      query {
        allTipoConstruccions {
          nodes {
            idTipoConstruccion
            tipoConstruccion
          }
        }
      }
    `
  });
  return resultado.data.allTipoConstruccions.nodes;
}

//Tipos de documentos
export async function obtenerTipoDocumentos(){
  const resultado = await client.query({
    query: gql`
      query {
        allTipoDocumentos {
          nodes {
            idTipoDocumento
            tipoDocumento
          }
        }
      }
    `
  });
  return resultado.data.allTipoDocumentos.nodes;
}

//Departamentos
export async function obtenerDepartamentos(){
  const resultado = await client.query({
    query: gql`
      query {
        allDepartamentos {
          nodes {
            idDepartamento
            nombre
          }
        }
      }
    `
  });
  return resultado.data.allDepartamentos.nodes;
}

//Obteniendo departamentos
export async function obtenerMunicipiosById(idDepartamento) {
  const resultado = await client.query({
    query: gql`
      query GetMunicipiosByDepartamento($departamentoId: Int!) {
        allMunicipios(condition: { departamentoId: $departamentoId }) {
          nodes {
            idMunicipio
            nombre
          }
        }
      }
    `,
    variables: { departamentoId: idDepartamento }
  });

  return resultado.data.allMunicipios.nodes;
}

/*----------- Funciones de guardar terrenos, predios, construcciones y propietadios -------------*/
export async function createTerreno(areaTerreno, valorComercial, idTipoTerreno, fuenteAguaCercana, tieneConstruncciones, predioId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        createTerreno(
          input: {
            terreno: {
              areaTerreno: ${areaTerreno}, 
              fuenteAguaCercana: ${fuenteAguaCercana}, 
              idTipoTerreno: ${idTipoTerreno}, 
              tieneConstruncciones: ${tieneConstruncciones}, 
              valorComercial: ${valorComercial}, 
              predioId: ${predioId}
            }
          }
        ) {
          clientMutationId
        }
      }
    `
  });
  return resultado.data;
}

export async function createConstruccion(areaTotal, direccion, numeroPisos, idTipoContruccion, predioId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        createConstruccion(
          input: {
            construccion: {
              areaTotal: ${areaTotal}, 
              direccion: "${direccion}", 
              idTipoContruccion: ${idTipoContruccion}, 
              numeroPisos: ${numeroPisos}, 
              predioId: ${predioId}
              }
            }
        ) {
          clientMutationId
        }
      }
    `
  });
  return resultado.data;
}

export async function createPredio(avaluo, minicipioId, nombre) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        createPredio(
          input: {
            predio: {
              avaluo: ${avaluo}, 
              minicipioId: ${minicipioId}, 
              nombre: "${nombre}"
            }
        }) 
        {
          clientMutationId
        }
      }
    `
  });
  return resultado.data;
}

export async function createPropietario(direccion, email, telefono) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        createPropietario(
          input: {
            propietario: {
              direccion: "${direccion}", 
              email: "${email}", 
              telefono: "${telefono}"
              }
            }) {
          clientMutationId
          propietario {
            idPropietario
          }
        }
      }
    `
  });
  return resultado.data.createPropietario.propietario.idPropietario;
}

export async function createJuridica(direccion, email, telefono, nit, razonSocial, predioId) {
  const idPropietario = await createPropietario(direccion, email, telefono)
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        createJuridica(
          input: {
            juridica: {
              nit: "${nit}", 
              razonSocial: "${razonSocial}", 
              idPropietario: ${idPropietario},
              predioId: ${predioId}
              }}
        ) {
          clientMutationId
        }
      }
    `
  });
  return resultado.data;
}

export async function createPersonaNatural(direccion, email, telefono, nombre, apellido, idTipoDocumento, documento, predioId) {
  const idPropietario = await createPropietario(direccion, email, telefono)
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        createPersonaNatural(
          input: {
            personaNatural: {
              idPropietario: ${idPropietario}, 
              nombre: "${nombre}", 
              apellido: "${apellido}", 
              idTipoDocumento: ${idTipoDocumento}, 
              numeroDocumento: "${documento}",
              predioId: ${predioId}
              }}
        ) {
          clientMutationId
        }
      }
    `
  });
  return resultado.data;
}
/*---------------- Funciones para listar elementos de la BD ---------------------*/
export async function allPredios() {
  const resultado = await client.query({
    query: gql`
      query {
        allPredios {
          nodes {
            nodeId
            numeroPredial
            nombre
            avaluo
            municipioByMinicipioId {
              idMunicipio
              nombre
              departamentoByDepartamentoId {
                idDepartamento
                nombre
              }
            }
          }
        }
      }
    `
  });
  return resultado.data.allPredios.nodes;
}

export async function allJuridicas() {
  const resultado = await client.query({
    query: gql`
      query {
        allJuridicas {
          nodes {
            nodeId
            nit
            razonSocial
            propietarioByIdPropietario {
              telefono
              direccion
              email
            }
            predioByPredioId {
              nombre
            }
            predioId
          }
        }
      }
    `
  });
  return resultado.data.allJuridicas.nodes;
}

export async function allNaturales() {
  const resultado = await client.query({
    query: gql`
      query {
        allPersonaNaturals {
          nodes {
            nodeId
            nombre
            apellido
            numeroDocumento
            tipoDocumentoByIdTipoDocumento {
              tipoDocumento
            }
            propietarioByIdPropietario {
              telefono
              direccion
              email
            }
            predioByPredioId {
              nombre
            }
          }
        }
      }
    `
  });
  return resultado.data.allPersonaNaturals.nodes;
}

export async function allConstruccions() {
  const resultado = await client.query({
    query: gql`
      query {
        allConstruccions {
          nodes {
            nodeId
            areaTotal
            direccion
            numeroPisos
            tipoConstruccionByIdTipoContruccion {
              tipoConstruccion
            }
            predioByPredioId {
              nombre
            }
          }
        }
      }
    `
  });
  return resultado.data.allConstruccions.nodes;
}


export async function allTerrenos() {
  const resultado = await client.query({
    query: gql`
      query {
        allTerrenos {
          nodes {
            nodeId
            areaTerreno
            valorComercial
            tipoTerrenoByIdTipoTerreno {
              tipoTerreno
            }
            predioByPredioId {
              nombre
            }
            predioId
            fuenteAguaCercana
            tieneConstruncciones
          }
        }
      }
    `
  });
  return resultado.data.allTerrenos.nodes;
}

/*---------------------- Funciones de eliminacion ---------------------------*/
export async function deleteTerreno(nodeId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        deleteTerreno(input: {nodeId: "${nodeId}"}) {
          clientMutationId
          deletedTerrenoId
        }
      }
    `
  });
  return resultado.data.deleteTerreno.nodes;
}

export async function deleteConstruccion(nodeId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        deleteConstruccion(input: {nodeId: "${nodeId}"}) {
          clientMutationId
          deletedConstruccionId
        }
      }
    `
  });
  return resultado.data.deleteConstruccion.nodes;
}

export async function deletePersonaNatural(nodeId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        deletePersonaNatural(input: {nodeId: "${nodeId}"}) {
          clientMutationId
          deletedPersonaNaturalId
        }
      }
    `
  });
  return resultado.data.deletePersonaNatural.nodes;
}

export async function deleteJuridica(nodeId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        deleteJuridica(input: {nodeId: "${nodeId}"}) {
          clientMutationId
          deletedJuridicaId
        }
      }
    `
  });
  return resultado.data.deleteJuridica.nodes;
}

export async function deletePredio(nodeId) {
  const resultado = await client.mutate({
    mutation: gql`
      mutation {
        deletePredio(input: {nodeId: "${nodeId}"}) {
          clientMutationId
          deletedPredioId
        }
      }
    `
  });
  return resultado.data.deletePredio.nodes;
}

/*---------------------Listar predios para el desplegable----------------------------*/
export async function predios() {
  const resultado = await client.query({
    query: gql`
      query {
        allPredios {
          nodes {
            nombre
            numeroPredial
          }
        }
      }
    `
  });
  return resultado.data.allPredios.nodes;
}

