import { Button, Box, useColorModeValue, Flex, Stack, Text, Header } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginButton() {
    const { data: session, status } = useSession();

    if (session) {

        return (
            <Flex minHeight={"100vh"} alignSelf={'center'}
                justifyItems={'center'} bg={useColorModeValue('gray.50', 'gray.800')}
            >

                <Box boxShadow={"md"} >
                    Signed in as {session.user?.email} <br />
                    <Button onClick={() => signOut()}>Sign out</Button>
                </Box>
            </Flex>
        )
    } else {
        return (
            <Flex minHeight={"100vh"} alignSelf={'center'} w={"100vw"} justifyContent={"center"}
                justifyItems={'center'} alignItems={"center"} bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack>
                    <Box alignSelf={"center"} >
                        <Text fontSize={"4xl"}>
                            Not signed in
                        </Text>
                    </Box>
                    <Box alignSelf={"center"} >

                        <Button onClick={() => signIn()}>Sign in</Button>
                    </Box>
                    <Box>
                        No account ? <Button variant={"ghost"}><Link href="/signup">Signup</Link></Button>
                    </Box>
                </Stack>
            </Flex >
        )
    }
}