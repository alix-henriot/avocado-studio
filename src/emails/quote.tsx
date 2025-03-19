import { Html, Button, Head, Container, Column, Row, Section, Font, Heading, Tailwind, Hr, Img, Body, Text } from "@react-email/components";

export const Email = () => {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Your price quote</title>
                <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
                />
            </Head>
            <Tailwind>

            

        <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] max-w-[465px]">
                <Section>
                    <Heading className="font-medium tracking-tight" as="h2">Avocado Studio</Heading>

                    {/* <Img
                    className="w-full aspect-[5/1] object-cover rounded-lg"
                    src="https://images.unsplash.com/photo-1580747182113-51c531c8fdf5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Background"
                    /> */}

                    <Row className="">
                        <Column className="w-full">
                            <Heading as="h2" className="text-xl font-extrabold">Your price quote #HJ65HG9</Heading>
                        </Column>
                        <Column className="w-full">
                            <Button href="" className="px-3 py-2 rounded-full bg-green-500 text-white text-nowrap text-sm text-center">
                                Approve quote
                            </Button>
                        </Column>
                    </Row>
                    <Hr/>
                </Section>
                <Section className="mb-8">
                    <Row className="bg-gray-100 rounded-lg">
                        <Column align="center"  className="h-[40px] w-1/3"> Description</Column>
                        <Column align="center" className="h-[40px] w-1/3">Quantity</Column>
                        <Column align="center" className="h-[40px] w-1/3">Price</Column>
                    </Row>
                    <Row className="px-4">
                        <Column align="left" className="h-[40px] w-1/3"> Photo</Column>
                        <Column align="center" className="h-[40px] w-1/3">1</Column>
                        <Column align="center" className="h-[40px] w-1/3">200€</Column>
                    </Row>
                </Section>

                <Section align="left">
                    <Row className="bg-gray-100 px-4">
                        <Column align="left"  className="h-[40px] w-1/2"> SUBTOTAL</Column>
                        <Column align="center" className="h-[40px] w-1/2">300€</Column>
                    </Row>
                    <Row className="px-4">
                        <Column align="left" className="h-[40px] w-1/2"> DISCOUNT</Column>
                        <Column align="center" className="h-[40px] w-1/2">30€</Column>
                    </Row>
                    <Row className="px-4">
                        <Column align="left" className="h-[40px] w-1/2"> TOTAL</Column>
                        <Column align="center" className="h-[40px] w-1/2">270€</Column>
                    </Row>
                </Section>

                <Section align="right" className="">
                    <Text>
                        Offer and discount valid until 20 february.<br />
                        50% deposit paid on acceptance of quotation.
                    </Text>
                </Section>
            </Container>
            </Body>
            </Tailwind>
        </Html>
    );
};

export default Email;