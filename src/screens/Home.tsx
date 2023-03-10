import { Alert, ScrollView, Text, View } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
];

const dateFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - dateFromYearStart.length;

interface SummaryProps {
  id: string;
  date: Date;
  amount: number;
  completed: number;
}

export function Home() {

  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps[] | null>(null);

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get('/summary');

      setSummary(response.data)

    } catch (error) {

      Alert.alert('Ops!', 'Não foi possível carregar o sumário de hábitos')
      console.log(error);

    }
    finally {
      setLoading(false);
    }
  }

  //Segundo a documentação, é indicado utilizar o useCallback, que vai nos 
  //garantir melhor performance 
  useFocusEffect(useCallback(() => {
    fetchData()
  }, []));


  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-background px-4 pt-16" >
      <Header />


      <View className="flex-row mt-6 mb-2 ">
        {
          weekDays.map((weekDay, index) => {
            return (
              <Text
                key={`${weekDay}-${index}`}
                className="text-xl text-zinc-400 font-bold text-center mx-1 "
                style={{ width: DAY_SIZE }}
              >
                {weekDay}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          summary &&
          <View className="flex-row flex-wrap ">
            {
              dateFromYearStart.map((date) => {

                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day');
                })

                return (
                  <HabitDay
                    key={date.toISOString()}
                    date={date}
                    amountCompleted={dayWithHabits?.completed}
                    amountOfHabits={dayWithHabits?.amount}
                    onPress={() => navigate('habit', {
                      date: date.toLocaleDateString()
                    })}
                  />
                )
              })
            }

            {

              amountOfDaysToFill > 0 && Array
                .from({ length: amountOfDaysToFill })
                .map((_, index) => {
                  return (
                    <View
                      key={index}
                      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                      style={{ width: DAY_SIZE, height: DAY_SIZE }}
                    />

                  )
                })

            }

          </View>
        }

      </ScrollView>
    </View>
  )
}

