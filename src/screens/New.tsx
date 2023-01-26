import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const availableWeekDays = [
  'Domingo',
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
]

export function New() {

  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {

    //Verifica se dentro de "weekDays" está incluso o index enviado
    //Se estiver o user quer desmarcar, se não quer marca-lo
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    }
    else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border focus:border-green-600"
          placeholder="Exercícios, Treinar"
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox
                key={weekDay}
                title={weekDay}
                checked={weekDays.includes(index)}
                onPress={() => handleToggleWeekDay(index)}
              />
            )
          })
        }

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row justify-center items-center bg-green-600 rounded-md mt-6"
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text
            className="font-semibold  text-white text-base ml-2"
          >
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}