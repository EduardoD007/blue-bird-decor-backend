module.exports = (objetoParams) => {
  for (let propriedade in objetoParams) {
    if(!Array.isArray(objetoParams[propriedade])){
      if(objetoParams[propriedade] == "vazio") {
        delete objetoParams[propriedade];
        }else {
          objetoParams[propriedade] = Number(objetoParams[propriedade]);
      }
    }
  }
  return objetoParams;
}