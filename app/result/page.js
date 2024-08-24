'use client'
import Link from 'next/link';
import { useEffect, useState } from "react"
import { db } from "@/app/firebase"
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import getStripe from "@/utils/get-stripe";

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionid = searchParams.get('session_id')
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchcheckoutSesssion = async () => {
            if (!sessionid) return
            try {
                const res = await fetch(`/api/checkout_session? session_id=${session_id}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                }
                else {
                    setError(sessionData.error)
                }
            }
            catch (err) {
                setError("error occured")
            }
            finally {
                setLoading(false)
            }
        }
        fetchcheckoutSesssion()
    }, [sessionid])
    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Loading...
                </Typography>
            </Container>
        )
    }
    if (error) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Link href="/" passHref>
                        <Button variant="contained" color="primary">
                            Return to Homepage
                        </Button>
                    </Link>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            {session && session.payment_status === 'paid' ? (
                <>
                    <Typography variant="h4">
                        {session.subscription_type === 'pro'
                            ? 'Thank you for subscribing to Pro!'
                            : 'Thank you for subscribing to Basic!'}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Link href="/" passHref>
                            <Button variant="contained" color="primary">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="h6" color="error">
                        Error: Payment status not found or payment incomplete.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Link href="/" passHref>
                            <Button variant="contained" color="primary">
                                Return to Homepage
                            </Button>
                        </Link>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default ResultPage;