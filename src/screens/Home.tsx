import { ScrollView, Text, View } from "react-native";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
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

export function Home() {
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
        <View className="flex-row flex-wrap ">
          {
            dateFromYearStart.map((date) => {
              return (
                <HabitDay
                  key={date.toISOString()}
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
      </ScrollView>
    </View>
  )
}