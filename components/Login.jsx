import { LockIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
} from "@chakra-ui/react";

import { AiOutlineUserAdd } from "react-icons/ai";
import { supabase } from "./helpers/supabase";

export default function Login() {
  const [mode, setMode] = useState("icon");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("name");
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const {
    isOpen: isOpenRegisterModal,
    onOpen: onOpenRegisterModal,
    onClose: onCloseRegisterModal,
  } = useDisclosure();

  function gen_uuid() {
    return uuidv4();
  }

  function submitRegister(values, { setSubmitting }) {
    supabase.auth
      .signUp({
        email: values.email,
        password: values.password,
      })
      .then((result) => {
        const registerJson = {
          name: values.username,
          image: "https://via.placeholder.com/500",
          is_mod: false,
          online: false,
          is_owner: false,
          is_private: false,
          description: null,
          is_verified: false,
          profile_views: 0,
          uuid: gen_uuid(),
        };
        supabase
          .from("user")
          .insert([{ user_info: registerJson, email: values.email }])
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
        setSubmitting(false);
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function submitSignout() {
    localStorage.removeItem("name");
    supabase.auth.signOut();
    router.reload();
  }

  function submitLogin(values, { setSubmitting }) {
    supabase.auth
      .signInWithPassword({
        email: values.email,
        password: values.password,
      })
      .then((result) => {
        supabase
          .from("user")
          .select("*")
          .eq("email", values.email)
          .then((response) => {
            localStorage.setItem("name", response.data[0].user_info.name);
            router.reload();
          });
      });
  }

  return (
    <>
      <Menu>
        <MenuButton as={Button} variant="ghost">
          {user ? user : <LockIcon />}
        </MenuButton>
        <MenuList>
          {user ? (
            <div>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={submitSignout}>Sign Out</MenuItem>
            </div>
          ) : (
            <>
              <MenuItem onClick={onOpenLoginModal}>Login</MenuItem>
              <MenuItem onClick={onOpenRegisterModal}>Register</MenuItem>
            </>
          )}
        </MenuList>
      </Menu>

      <Modal
        isOpen={isOpenRegisterModal}
        onClose={onCloseRegisterModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                username: Yup.string().required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                submitRegister(values, { setSubmitting });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormControl isInvalid={errors.username && touched.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field name="username">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="username"
                          placeholder="Username"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="email"
                          placeholder="test@test.com"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="*******"
                          />
                        )}
                      </Field>
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="*******"
                          />
                        )}
                      </Field>
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>

                  <Button mt={4} colorScheme="blue" type="submit">
                    Submit
                  </Button>
                  <Button mt={4} ml={4} onClick={onCloseRegisterModal}>
                    Cancel
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenLoginModal} onClose={onCloseLoginModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                submitLogin(values, { setSubmitting });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="test@test.com"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="*******"
                          />
                        )}
                      </Field>
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button mt={4} colorScheme="blue" type="submit">
                    Submit
                  </Button>
                  <Button mt={4} ml={4} onClick={onCloseLoginModal}>
                    Cancel
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
