// Libraries
import React, { useState } from "react"
import { reverse, sortBy } from "lodash"

// Components
import Emoji from "./Emoji"
import { Option, OptionContainer, OptionText } from "./SharedStyledComponents"
import Translation from "./Translation"
import { Box, Flex, Img, Text, useColorModeValue } from "@chakra-ui/react"

export interface IProps {
  monthData: any
  quarterData: any
  allTimeData: any
}

const TranslationLeaderboard: React.FC<IProps> = ({
  monthData,
  quarterData,
  allTimeData,
}) => {
  const tableBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const tableItemBoxShadow = useColorModeValue(
    "tableItemBox.light",
    "tableItemBox.dark"
  )
  const leaderboardData = {
    monthData: reverse(sortBy(monthData.data, ({ user }) => user.totalCosts)),
    quarterData: reverse(
      sortBy(quarterData.data, ({ user }) => user.totalCosts)
    ),
    allTimeData: reverse(
      sortBy(allTimeData.data, ({ user }) => user.totalCosts)
    ),
  }
  const [filterAmount, updateFilterAmount] = useState(10)
  const [dateRangeType, updateDateRangeType] = useState("monthData")

  const showLess = () => {
    updateFilterAmount(10)
  }

  const showMore = () => {
    updateFilterAmount(50)
  }

  return (
    <Box>
      <OptionContainer>
        <Option
          onClick={() => updateDateRangeType("monthData")}
          isActive={dateRangeType === "monthData"}
        >
          <OptionText fontSize={"18px"}>
            <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-month-view" />
          </OptionText>
        </Option>
        <Option
          onClick={() => updateDateRangeType("quarterData")}
          isActive={dateRangeType === "quarterData"}
        >
          <OptionText fontSize={"18px"}>
            <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-quarter-view" />
          </OptionText>
        </Option>
        <Option
          onClick={() => updateDateRangeType("allTimeData")}
          isActive={dateRangeType === "allTimeData"}
        >
          <OptionText fontSize={"18px"}>
            <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-all-time-view" />
          </OptionText>
        </Option>
      </OptionContainer>
      <Box bg="background" boxShadow={tableBoxShadow} w="full" mb={8}>
        <Flex
          bg="grayBackground"
          textDecoration="none"
          justifyContent="space-between"
          alignItems="center"
          color="text"
          mb="px"
          p={4}
          w="full"
        >
          <Flex>
            <Box w={10} opacity="0.4">
              #
            </Box>
            <Flex
              flexDirection="row"
              alignItems="center"
              mr={8}
              overflowWrap="anywhere"
            >
              <Translation id="page-contributing-translation-program-acknowledgements-translator" />
            </Flex>
          </Flex>
          <Flex minW="20%" flexDirection="row" alignItems="left">
            <Translation id="page-contributing-translation-program-acknowledgements-total-words" />
          </Flex>
        </Flex>
        {/* // TODO: Remove specific user checks once Acolad has updated their usernames */}
        {leaderboardData[dateRangeType]
          .filter(
            (item) =>
              item.user.username !== "ethdotorg" &&
              !item.user.username.includes("LQS_") &&
              !item.user.username.includes("REMOVED_USER") &&
              !item.user.username.includes("Aco_") &&
              !item.user.fullName.includes("Aco_") &&
              !item.user.username.includes("Acc_") &&
              !item.user.fullName.includes("Acc_") &&
              item.user.username !== "Finnish_Sandberg" &&
              item.user.username !== "Norwegian_Sandberg" &&
              item.user.username !== "Swedish_Sandberg"
          )
          .filter((item, idx) => idx < filterAmount)
          .map((item, idx) => {
            const { user, languages } = item
            const sortedLanguages = reverse(
              sortBy(languages, ({ language }) => language.totalCosts)
            )

            let emoji: string | null = null
            if (idx === 0) {
              emoji = ":trophy:"
            } else if (idx === 1) {
              emoji = ":2nd_place_medal:"
            } else if (idx === 2) {
              emoji = ":3rd_place_medal:"
            }
            return (
              <Flex
                textDecoration="none"
                justifyContent="space-between"
                alignItems="center"
                color="text"
                boxShadow={tableItemBoxShadow}
                mb="px"
                py={2}
                px={4}
                w="full"
                _hover={{
                  borderRadius: "base",
                  boxShadow: "tableItemBoxHover",
                  bg: "tableBackgroundHover",
                }}
                key={idx}
              >
                <Flex>
                  {emoji ? (
                    <Box w={10}>
                      <Emoji mr={4} fontSize="2rem" text={emoji} />
                    </Box>
                  ) : (
                    <Box w={10} opacity="0.4">
                      {idx + 1}
                    </Box>
                  )}
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    mr={8}
                    overflowWrap="anywhere"
                  >
                    <Img
                      mr={4}
                      h={{ base: "30px", sm: 10 }}
                      w={{ base: "30px", sm: 10 }}
                      borderRadius="50%"
                      display={{ base: "none", s: "block" }}
                      src={user.avatarUrl}
                    />
                    <Box maxW={{ base: "100px", sm: "none" }}>
                      {user.username}
                      <Text m={0} display="block" fontSize="sm" opacity="0.6">
                        {sortedLanguages[0].language.name}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
                <Flex minW="20%" flexDirection="row" alignItems="left">
                  <Emoji
                    display={{ base: "none", sm: "block" }}
                    mr={2}
                    fontSize="2xl"
                    text={":writing:"}
                  />
                  {user.totalCosts}
                </Flex>
              </Flex>
            )
          })}
      </Box>
      <OptionContainer>
        <Option onClick={filterAmount === 10 ? showMore : showLess}>
          <OptionText fontSize={"18px"}>
            <Translation
              id={
                filterAmount === 10
                  ? "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-more"
                  : "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-less"
              }
            />
          </OptionText>
        </Option>
      </OptionContainer>
    </Box>
  )
}

export default TranslationLeaderboard
