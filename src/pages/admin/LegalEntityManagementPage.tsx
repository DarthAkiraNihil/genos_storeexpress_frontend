import React, {ChangeEvent, useContext, useEffect} from 'react';
import {LegalEntityContext, useAuth} from "../../context";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import 'styles/Common.css';
import {PaginatedList} from "../../models";
import {LegalEntity} from "../../models/user";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {LegalEntityCard} from "../../components/admin";

export const LegalEntityManagementPage: React.FC = () => {

    const { token } = useAuth();
    const context = useContext(LegalEntityContext);

    const [verified, setVerified] = React.useState<PaginatedList<LegalEntity>>();
    const [awaiting, setAwaiting] = React.useState<PaginatedList<LegalEntity>>();

    useEffect(() => {
        context?.getVerified(token!, 0, 10).then((response) => {
            setVerified(response);
        })
        context?.getAwaiting(token!, 0, 10).then((response) => {
            setAwaiting(response);
        })
    }, [token, context]);

    if (!context) {
        return <div>No context is available</div>
    }

    const verify = (id: string) => {
        context?.verify(id, token!);
    }

    const revoke = (id: string) => {
        context?.revoke(id, token!);
    }

    const handleChangeAwaitingPage = (event: ChangeEvent<unknown>, page: number): void => {
        setAwaiting(undefined);
        context?.getAwaiting(token!, page, 10).then((response) => {
            setAwaiting(response);
        })
    }

    const handleChangeVerifiedPage = (event: ChangeEvent<unknown>, page: number): void => {
        setVerified(undefined);
        context?.getVerified(token!, page, 10).then((response) => {
            setVerified(response);
        })
    }

    if (!verified || !awaiting) {
        return (
            <Box display="flex" justifyContent="center">
                <Typography variant="h4">
                    Всего { 0 } юридических лиц подтверждено. { 0 } лиц нуждаются в вашем внимании, так как они не подтверждены
                </Typography>
            </Box>
        )
    }

    return <Stack className="list" spacing={8} sx={{marginTop: '32px'}}>
        <Box display="flex" justifyContent="center">
            <Typography variant="h4">
                Всего { verified!.count } юридических лиц подтверждено. { awaiting!.count } лиц нуждаются в вашем внимании, так как они не подтверждены
            </Typography>
        </Box>

        <Card sx={{ display: 'flex', padding: '20px', justifyContent: "center", alignItems: "center" }} >
            <Stack className="list" spacing={8} >
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <h2>
                            Ожидающие подтверждения (всего: {awaiting.count} )
                        </h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={8}>
                            {
                                awaiting.items.length > 0 ? awaiting.items.map((item) => {
                                        console.log(item);
                                        return (
                                            <div key={item.id} className="card">
                                                < LegalEntityCard legalEntity={item} verified={false} verify={verify} revoke={revoke} />
                                            </div>
                                        )
                                    }
                                ) : (
                                    <h3>
                                        Никто не ожидает подтверждения
                                    </h3>
                                )
                            }
                            <Box display="flex" justifyContent="center">
                                <Pagination count={Math.floor(awaiting.count / 10) + 1} shape="rounded" onChange={handleChangeAwaitingPage}
                                            sx={{justifyContent: "center", alignItems: "center"}} />
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>

                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <h2>
                            Подтверждённые лица (всего: {verified.count} )
                        </h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={8}>
                            {
                                verified.items.length > 0 ? verified.items.map((item) => {
                                        console.log(item);
                                        return (
                                            <div key={item.id} className="card">
                                                < LegalEntityCard legalEntity={item} verified={true} verify={verify} revoke={revoke} />
                                            </div>
                                        )
                                    }
                                ) : (
                                    <h3>
                                        Никто не подтверждён ещё
                                    </h3>
                                )
                            }
                            <Box display="flex" justifyContent="center">
                                <Pagination count={Math.floor(verified.count / 10) + 1} shape="rounded" onChange={handleChangeVerifiedPage}
                                            sx={{justifyContent: "center", alignItems: "center"}} />
                            </Box>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Card>

    </Stack>
}