<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Hora</th>
            <th>Servcio</th>
            <th>IDCitas</th>
            <th>CC</th>
            <th>DOC</th>
            <th>Estado</th>
            <th>Pago</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </template>

<style scoped>
  .table-container {
    margin: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  table th, table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  thead {
    background-color: #f5f5f5;
  }
  
  h2 {
    margin-bottom: 15px;
  }
  </style>