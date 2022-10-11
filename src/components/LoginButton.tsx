import { Button, Box, useColorModeValue, Flex, Stack, Text, Header } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginButton() {
    const { data: session, status } = useSession({ required: true });

    if (session) {

        return (

            <Box boxShadow={"md"} alignSelf={'center'}
                justifyItems={'center'} >
                <Stack align={'center'} justify={'center'}>
                    <Text>Signed in as {session.user?.email}</Text>
                    <Button bg={'blue.400'} _hover={{ bg: 'blue.600' }} color={'white'} variant={'outline'} w={'sm'}
                        onClick={() => signOut()}>Sign out</Button>
                </Stack>
            </Box >
        )
    } else {
        return (
            <Stack>
                <Box alignSelf={"center"} >
                    <Text fontSize={"4xl"}>
                        Login
                    </Text>
                </Box>
                <Box alignSelf={"center"} >

                    <Button onClick={() => signIn()}>Sign in</Button>
                </Box>
                <Box>
                    <Text>Not a member yet? <Button><Link href="/signup" >Signup</Link></Button></Text>
                </Box>
            </Stack>
        )
    }
}