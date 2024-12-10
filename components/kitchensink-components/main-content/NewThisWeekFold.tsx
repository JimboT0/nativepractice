import React, { useRef, useState, useContext } from "react";
import {
  Box,
  HStack,
  Center,
  Image,
  Icon,
  Pressable,
  Text,
} from "../../ui";
import { ScrollView } from "react-native";
import { ChevronLeft, ChevronRight, Clock, LucideIcon, PenBox } from "lucide-react-native";
import { ThemeContext } from "../../../App";
import {
  Settings,
  Users,
  Layout,
  Bell,
  Calendar,
  Mail,
  FileText,
  Image as ImageIcon,
  Bookmark,
  Map,
  Phone,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { Linking, Modal } from 'react-native';
import ListYourPlaceModal from "./ListYourPlaceModal";

const data = [
  {
    icon: PenBox,
    description: "Requests",
  },
  {
    icon: Users,
    description: "Meetings",
  },
  {
    icon: Calendar,
    description: "Calendar",
  },
  {
    icon: FileText,
    description: "Documents",
  },
  {
    icon: ImageIcon,
    description: "Gallery",
  },
  {
    icon: Bookmark,
    description: "Bookmarks",
  },
  {
    icon: Map,
    description: "Maps",
  },
  {
    icon: Phone,
    description: "Contacts",
  },
  {
    icon: Share2,
    description: "Share",
  },
];

const NewThisWeekFold = () => {
  const scrollViewRef = useRef(null);
  const scrollAmount = 400;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContentAtRight, setIsContentAtRight] = useState(true);
  const { colorMode } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleScrollLeft = () => {
    const newScrollPosition = scrollPosition - scrollAmount;
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true,
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollRight = () => {
    const newScrollPosition = scrollPosition + scrollAmount;
    if (scrollViewRef.current)
      // @ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: newScrollPosition,
        animated: true,
      });
    setScrollPosition(newScrollPosition);
  };

  const checkContentAtLeft = () => {
    if (scrollPosition > 0) {
      return true;
    }
    return false;
  };

  const isCloseToRight = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isScrollAtEnd =
      contentOffset.x + layoutMeasurement.width >= contentSize.width;
    if (isScrollAtEnd) {
      return true;
    }
    return false;
  };

  const handlePress = (item: { icon?: LucideIcon; description: any; }) => {
    switch (item.description) {
      case "Requests":
        setModalVisible(true);
        break;
      case "Meetings":
        navigation.navigate('MeetingsPage');
        break;
      case "Calendar":
        Linking.openURL('https://calendar.example.com');
        break;
      // Add more cases as needed
      default:
        break;
    }
  };

  return (
    <Box className="w-full">
      <ListYourPlaceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      
      <ScrollView
        horizontal
        style={{ width: "100%" }}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        scrollEventThrottle={50}
        onScroll={(event) => {
          if (isCloseToRight(event)) {
            setIsContentAtRight(false);
          } else {
            setIsContentAtRight(true);
          }
          setScrollPosition(event.nativeEvent.contentOffset.x);
        }}
      >
        <HStack space="md" className="w-full px-4 md:px-0">
          {data.map((item, index) => {
            return (
              <Pressable key={index} onPress={() => handlePress(item)}>
                <Box className="flex-shrink-0 border shadow-sm rounded-md m-2">
                  <Box className="w-32 h-32 rounded-md bg-background-100 items-center justify-center">
                    <Icon
                      as={item.icon}
                      size="xl"
                      color={colorMode === "light" ? "#535252" : "#DCDBDB"}
                    />
                    <Text
                      className="text-center mt-2 text-sm"
                    >
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </Pressable>
            );
          })}
        </HStack>
      </ScrollView>
      <ScrollLeft
        handleScrollLeft={handleScrollLeft}
        disabled={!checkContentAtLeft()}
      />
      <ScrollRight
        handleScrollRight={handleScrollRight}
        disabled={!isContentAtRight}
      />
    </Box>
  );
};

const ScrollLeft = ({ handleScrollLeft, disabled }: any) => {
  const { colorMode } = useContext(ThemeContext);
  return (
    <Center className="absolute left-0 h-full hidden md:flex">
      <Pressable
        className={`p-1 ml-3 rounded-full border-outline-300 border bg-background-50 md:-ml-[16px] hover:bg-background-100 ${disabled
            ? "data-[disabled=true]:opacity-0"
            : "data-[disabled=true]:opacity-100"
          }`}
        disabled={disabled}
        onPress={handleScrollLeft}
      >
        <Icon
          as={ChevronLeft}
          size="lg"
          color={colorMode === "light" ? "#535252" : "#DCDBDB"}
        />
      </Pressable>
    </Center>
  );
};

const ScrollRight = ({ handleScrollRight, disabled }: any) => {
  const { colorMode } = useContext(ThemeContext);
  return (
    <Center className="absolute right-0 h-full hidden md:flex">
      <Pressable
        className={`p-1 ml-3 rounded-full border-outline-300 border bg-background-50 md:-mr-4 hover:bg-background-100 ${disabled
            ? "data-[disabled=true]:opacity-0"
            : "data-[disabled=true]:opacity-100"
          }`}
        onPress={handleScrollRight}
        disabled={disabled}
      >
        <Icon
          as={ChevronRight}
          size="lg"
          color={colorMode === "light" ? "#535252" : "#DCDBDB"}
        />
      </Pressable>
    </Center>
  );
};

export default NewThisWeekFold;
