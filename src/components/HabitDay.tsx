import { Dimensions, TouchableOpacity } from "react-native";

const WEEK_DAYS = 7;

//São 32 de cada lado, dividido por 5 quadradinhos dos dias da semana, que tbm terá um padding
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

//Esse representa o espaçamento que terá entre os dias da semana(quadradinhos)
export const DAY_MARGIN_BETWEEN = 8;

//Representa o tamanho que é permitido acomodar e exibir 7 quadradinhos na tela.(as telas podem ter tamanhos variados)
//Em seguida é descontado as margins e padding que possuí entre os quadradinhos
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING);

export function HabitDay() {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    />
  )
}