import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { api } from "../lib/axios";

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
  const [title, setTitle] = useState('');

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

  async function handleCreateNewHabit() {
    try {

      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('Novo Hábito', 'Informe o nome do hábito e escolha sua periodicidade.')
      }

      await api.post('/habits', {
        title,
        weekDays
      });

      setTitle('');
      setWeekDays([]);

      Alert.alert('Novo Hábito', 'Hábito criado com sucesso.')

    } catch (error) {
      console.log(error);
      Alert.alert('Ops!', `Um erro aconteceu e : ${error}`);
    }
    finally {

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
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border border-zinc-800 focus:border-green-600"
          placeholder="Treinar 30min, Ler 5 páginas do ..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
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
          onPress={handleCreateNewHabit}

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