export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined; //undefined pois não terá parâmetro
      new: undefined; //undefined pois não terá parâmetro
      habit: {
        //Não é recomendado ficar passando muitas coisas aqui, nem objetos complexos
        date: string;
      }
    }
  }
}