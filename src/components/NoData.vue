<template>
    <div id="container">
      <strong id="noData">No Data</strong>
      <br/><br/>
      <p >{{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    message: String,
  });
  </script>
  
  <style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  #container strong {
    font-size: 20px;
    line-height: 26px;
  }
  
  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }
  
  #container a {
    text-decoration: none;
  }
  #noData {
    padding:7px;
    border:2px solid #cf8901;
    border-radius: 5px;

  }
  </style>