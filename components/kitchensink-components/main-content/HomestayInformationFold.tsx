import React, { useContext } from "react";
import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  Tooltip,
  TooltipContent,
  TooltipText,
  StarIcon,
  Heading,
} from "../../ui";
import { ChevronRight, Heart } from "lucide-react-native";
import { AnimatePresence, Motion } from "@legendapp/motion";
import { ScrollView } from "react-native";
import { ThemeContext } from "../../../App";

const tabsData = [
  {
    name: "Popular",
    data: [
      {
        title: "Car Wash",
        src: require("../../../assets/display/carwash.jpg"),
        location: "1 1st Street",
        price: "R300",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image20.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image21.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Gardening",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image22.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image23.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image24.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Cleaning",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image25.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image26.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image27.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Security",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image28.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image29.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image30.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Maintenance",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image31.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image32.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image33.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Wellness",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image16.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image17.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image18.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Transport",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image16.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image17.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image18.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Assistance",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image16.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image17.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image18.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
  {
    name: "Other",
    data: [
      {
        title: "ImageView Inn",
        src: require("../../../assets/display/image16.png"),
        location: "401 Platte River Rd, Gothenburg, United States",
        price: "$1,481",
        rating: 4.9,
      },
      {
        title: "Spinner Resort",
        src: require("../../../assets/display/image17.png"),
        location: "1502 Silica Ave, Sacramento California",
        price: "$1,381",
        rating: 4.89,
      },
      {
        title: "DropDown Den",
        src: require("../../../assets/display/image18.png"),
        location: "2945 Entry Point Blvd, Kissimmee, Florida",
        price: "$2,481",
        rating: 4.6,
      },
    ],
  },
];


const tabs = [
  {
    title: "Popular", 
  },
  {
    title: "Gardening",
  },
  {
    title: "Cleaning",
  },
  {
    title: "Security",
  },
  {
    title: "Maintenance",
  },
  {
    title: "Wellness",
  },
  {
    title: "Transport",
  },
  {
    title: "Assistance",
  },
  {
    title: "Other",
  },
];

const HomestayInformationFold = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  return (
    <Box className="pt-4 px-4 md:px-0">
      <Heading size="xl">Services</Heading>
      <HomestayInfoTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <TabPanelData activeTab={activeTab} />
    </Box>
  );
};

const HomestayInfoTabs = ({ tabs, activeTab, setActiveTab }: any) => {
  return (
    <Box className="border-b border-outline-50 md:border-b-0 md:border-transparent">
      <Box className="py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack space="lg" className="mx-0.5 xl:gap-5 2xl:gap-6">
            {tabs.map((tab: any) => {
              return (
                <Pressable
                  key={tab.title}
                  className={`my-0.5 py-1 ${activeTab === tab ? "border-b-[3px]" : "border-b-0"
                    } border-outline-900 hover:border-b-[3px] ${activeTab === tab
                      ? "hover:border-outline-900"
                      : "hover:border-outline-200"
                    } `}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    size="sm"
                    className={`${activeTab === tab
                        ? "text-typography-900"
                        : "text-typography-600"
                      } font-medium`}
                  >
                    {tab.title}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

const TabPanelData = ({ activeTab }: any) => {
  const [likes, setLikes]: any = React.useState([]);
  const { colorMode } = useContext(ThemeContext);

  return (
    <VStack className="justify-between lg:flex-row">
      {tabsData.map((tab) => {
        return (
          <>
            {tab.name.toLowerCase() === activeTab.title.toLowerCase() &&
              tab.data.map((image: any, index: any) => {
                return (
                  <Box
                    key={index}
                    className={`flex-1 my-2 lg:my-0 ${index === 0 ? "lg:ml-0" : "lg:ml-2"
                      } ${index === tabsData.length - 1 ? "lg:mr-0" : "lg:mr-2"}`}
                  >
                    <Pressable className="w-full">
                      {(props: any) => {
                        return (
                          <>
                            <Box className="overflow-hidden rounded-md h-72">
                              <Image
                                source={image.src}
                                className={`w-full h-72 ${props.hovered
                                    ? "scale-[1.04] opacity-90"
                                    : "scale-100 opacity-100"
                                  }`}
                                alt="Explore"
                              />
                            </Box>
                            {props.hovered && (
                              <Box className="absolute bg-[#181718] opacity-30 w-full h-full cursor-pointer" />
                            )}
                            <Box
                              className={`absolute top-[45%] bg-transparent rounded border border-white self-center content-center py-1.5 px-4 flex-row ${props.hovered ? "flex" : "hidden"
                                }`}
                            >
                              <Text className="text-white">Explore</Text>
                              <Icon
                                as={ChevronRight}
                                size="sm"
                                className="self-center"
                                color="white"
                              />
                            </Box>
                          </>
                        );
                      }}
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        if (likes.includes(image.title)) {
                          const newLikes = likes.filter(
                            (like: any) => like !== image.title
                          );
                          setLikes(newLikes);
                          return;
                        } else {
                          setLikes([...likes, image.title]);
                        }
                      }}
                      className="absolute top-3 right-4 h-6 w-6 justify-center items-center"
                    >
                      <AnimatePresence>
                        <Motion.View
                          key={
                            likes.includes(image.title) ? "liked" : "unliked"
                          }
                          initial={{
                            scale: 1.3,
                          }}
                          animate={{
                            scale: 1,
                          }}
                          exit={{
                            scale: 0.9,
                          }}
                          transition={{
                            type: "spring",
                            mass: 0.9,
                            damping: 9,
                            stiffness: 300,
                          }}
                          style={{
                            position: "absolute",
                          }}
                        >
                          <Icon
                            as={Heart}
                            size="lg"
                            className={`${likes.includes(image.title)
                                ? "fill-red-500 stroke-red-500"
                                : "fill-gray-500 stroke-white"
                              }`}
                          />
                        </Motion.View>
                      </AnimatePresence>
                    </Pressable>

                    <HStack className="justify-between py-1 items-start">
                      <VStack space="sm" className="flex-1">
                        <Text className="font-semibold text-typography-900">
                          {image.title}
                        </Text>
                        <Text size="sm" className="text-typography-500">
                          {image.location}
                        </Text>
                        <HStack>
                          <Text
                            size="sm"
                            className="font-semibold text-typography-900"
                          >
                            {image.price}
                          </Text>

                        </HStack>
                      </VStack>
                      <Tooltip
                        trigger={(triggerProps: any) => {
                          return (
                            <Pressable {...triggerProps}>
                              <HStack className="items-center flex-start">
                                <Icon
                                  as={StarIcon}
                                  size="2xs"
                                  className="stroke-typography-900 fill-typography-900"
                                />
                                <Text
                                  size="sm"
                                  className="pl-1 text-typography-900"
                                >
                                  {image.rating}
                                </Text>
                              </HStack>
                            </Pressable>
                          );
                        }}
                      >
                        <TooltipContent>
                          <TooltipText className="text-white px-2 py-1">
                            Ratings
                          </TooltipText>
                        </TooltipContent>
                      </Tooltip>
                    </HStack>
                  </Box>
                );
              })}
          </>
        );
      })}
    </VStack>
  );
};
export default HomestayInformationFold;
