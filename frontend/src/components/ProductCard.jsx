import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  Dialog,
  Portal,
  CloseButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Toaster />

        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />

        <Box p={4}>
          {" "}
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight={"bold"} fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack gap={2}>
            <Button
              bg="blue.300"
              p={2}
              rounded="md"
              onClick={() => setOpen(true)}
            >
              <Icon as={FaRegEdit} />
            </Button>

            <Button
              bg="red.300"
              p={2}
              rounded="md"
              onClick={() => handleDeleteProduct(product._id)}
            >
              <Icon as={MdDelete} />
            </Button>
          </HStack>
        </Box>
      </Box>

      <Dialog.Root
        size="sm"
        placement="center"
        motionPreset="slide-in-bottom"
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Product Price"
                    name="price"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Product Image"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  bg="blue.300"
                  p={2}
                  rounded="md"
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>
                <Button
                  bg="red.300"
                  p={2}
                  rounded="md"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default ProductCard;
