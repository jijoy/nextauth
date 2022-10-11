import {
    FormControl, FormLabel, Heading, Box, Stack,
    Flex, useColorModeValue,
    InputRightElement, InputGroup,
    Text, Input, Button, Link as ChakraLink
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from "react";
import Link from "next/link";
import { createSecureServer } from "http2";
import { useRouter } from "next/router";

type UserProps = {
    username: string,
    email: string,
    password: string
}

export default function SignupForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const router = useRouter();

    const createUser = () => {
        fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        }).then(response => response.json()).
            then(responseJson => {
                setIsSuccess(responseJson.user)
                if (isSuccess) {
                    router.push('/');
                }
            });
    }

    return (
        <Flex minHeight={"100vh"} alignSelf={'center'}
            justifyItems={'center'} bg={useColorModeValue('gray.50', 'gray.800')} fontSize={"xs"} lineHeight={"normal"} letterSpacing={"normal"} wordBreak={"normal"} as={undefined}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        SignUp
                    </Heading>
                    <Text fontSize={"lg"} color={'gray.600'}>
                        to enjoy all cool features!!.
                    </Text>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue('white', 'gray.700')} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <Box>
                            <FormControl id="name" isRequired>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <Input type="text" onChange={(e) => { setUsername(e.target.value) }} />
                            </FormControl>
                        </Box>
                        <FormControl id="email" isRequired>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} />
                                <InputRightElement h={'full'}>
                                    <Button variant="ghost" onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button loadingText="Submitting..."
                                size={"lg"} bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500" }}
                                onClick={() => { createUser() }}>
                                Signup
                            </Button>
                        </Stack>
                        <Stack>
                            <Text align={"center"}>
                                Already a user ? <Link href="/">Login to use our services</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

        </Flex>
    )
}

