// import React, { useState } from 'react';
// import { supabase } from '../lib/supabase';
// import { Box, VStack, HStack, Text, Input, Button, Pressable, Icon, ArrowLeftIcon, Heading, FormControl, FormControlLabel, ButtonIcon, ButtonText, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, EyeIcon, EyeOffIcon, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabelText, InputField, InputIcon, InputSlot, Link, LinkText } from './ui';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// export default function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function signInWithEmail() {
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     // if (error) {
//     //   Alert.alert('Login Error', error.message);
//     // } else {
//     //   Alert.alert('Success', 'You are now signed in!');
//     // }
//     // setLoading(false);
//   }

//   return (

//     <Box>
//       <VStack>
//         <Box>
//           <Text>Email</Text>
//           <Input
//             placeholder="email@address.com"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </Box>
//         <Box>
//           <Text>Password</Text>
//           <Input
//             placeholder="Password"
//             secureTextEntry
//             autoCapitalize="none"
//             value={password}
//             onChangeText={setPassword}
//           />
//         </Box>
//         <HStack>
//           <Button isDisabled={loading} onPress={signInWithEmail}>
//             {loading ? 'Signing in...' : 'Sign in'}
//           </Button>
//         </HStack>
//       </VStack>
//     </Box>
//   );
// }
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Box, VStack, HStack, Text, Input, Button, Pressable, Icon, ArrowLeftIcon, Heading, FormControl, FormControlLabel, ButtonIcon, ButtonText, Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckIcon, EyeIcon, EyeOffIcon, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabelText, InputField, InputIcon, InputSlot, Link, LinkText } from './ui';
import { AlertTriangle } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
  
  // Email and Password validation functions
  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !emailRegex.test(email) ? 'Invalid email address' : true;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    return password.length < 6 ? 'Password must be at least 6 characters' : true;
  };

  const signInWithEmail = async (data: { email: string; password: string }) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      Alert.alert('Success', 'You are now signed in!');
    }
    setLoading(false);
  };

  return (
    <Box className="mt-10 p-3">
      <VStack className="max-w-[440px] w-full space-md">
        <VStack className="md:items-center space-md">
          <Pressable>
            <Icon as={ArrowLeftIcon} className="md:hidden text-background-800" size="xl" />
          </Pressable>
          <VStack>
            <Heading className="md:text-center" size="3xl">
              Log in
            </Heading>
            <Text>Login to start using Gluestack</Text>
          </VStack>
        </VStack>

        {/* Email input */}
        <VStack className="py-1 w-[50%] mt-5">
          <FormControl isInvalid={!!errors?.email}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full">
                  <InputField
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              {/* <FormControlErrorText>{errors?.email?.message}</FormControlErrorText> */}
            </FormControlError>
          </FormControl>
        </VStack>

        

        {/* Password input */}
        <VStack className="py-1 w-[50%]">
          <FormControl isInvalid={!!errors?.password}>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="password"
              control={control}
              rules={{ validate: validatePassword }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className="w-full">
                  <InputField
                    secureTextEntry
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              {/* <FormControlErrorText>{errors?.password?.message}</FormControlErrorText> */}
            </FormControlError>
          </FormControl>
        </VStack>

        {/* Remember me checkbox */}
        <HStack className="w-full justify-between mt-5">
          <Controller
            name="remember"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                size="sm"
                value="Remember me"
                isChecked={value}
                onChange={onChange}
                aria-label="Remember me"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>Remember me</CheckboxLabel>
              </Checkbox>
            )}
          />
          <Link href="/auth/forgot-password">
            <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
              Forgot Password?
            </LinkText>
          </Link>
        </HStack>

        {/* Sign in button */}
        <VStack className="w-full my-7 space-lg">
          <Button className="w-full" onPress={handleSubmit((data: FormData) => signInWithEmail(data))} isDisabled={loading}>
            <ButtonText className="font-medium">
              {loading ? 'Signing in...' : 'Log in'}
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => {}}
          >
          </Button>
        </VStack>

        {/* Signup link */}
        <HStack className="self-center space-sm">
          <Text size="md">Don't have an account?</Text>
          <Link href="/auth/signup">
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

