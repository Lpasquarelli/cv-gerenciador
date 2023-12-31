import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ClientsDataState } from "./clientsDataTypes";
import { addClient, consultaUsuarios, getClients } from "./clientsDataThunk";
import { ICliente } from "../../../interfaces/ICliente";
import {
    IUserCliente,
    IUserList,
} from "../../../interfaces/IUserClienteResponse";

const initialState: ClientsDataState = {
    clientsData: undefined,
    clientsDataStatus: "idle",
    userDataStatus: "idle",
};

const clientsDataSlice = createSlice({
    name: "clientsData",
    initialState,
    reducers: {
        adicionaCliente(
            state: ClientsDataState,
            action: PayloadAction<ICliente>
        ) {
            const aux = state.clientsData;
            aux?.push(action.payload);
            state.clientsData = aux;
        },
        editClient(state: ClientsDataState, action: PayloadAction<ICliente>) {
            const clienteExists = state.clientsData?.some(
                (cli) => cli.idCliente === action.payload.idCliente
            );

            if (clienteExists) {
                const clients = state.clientsData?.map((cli) => {
                    if (cli.idCliente === action.payload.idCliente) {
                        return action.payload;
                    }

                    return cli;
                });

                state.clientsData = clients;
            }
        },
    },
    extraReducers: (buider) => {
        buider.addCase(
            getClients.fulfilled,
            (state: ClientsDataState, action: PayloadAction<ICliente[]>) => {
                state.clientsData = action.payload;
                state.clientsDataStatus = "success";
            }
        );
        buider.addCase(getClients.rejected, (state: ClientsDataState) => {
            state.clientsDataStatus = "error";
        });
        buider.addCase(getClients.pending, (state: ClientsDataState) => {
            state.clientsDataStatus = "pending";
        });

        buider.addCase(consultaUsuarios.pending, (state: ClientsDataState) => {
            state.userDataStatus = "pending";
        });
        buider.addCase(
            consultaUsuarios.fulfilled,
            (state: ClientsDataState) => {
                state.userDataStatus = "success";
            }
        );

        buider.addCase(consultaUsuarios.rejected, (state: ClientsDataState) => {
            state.userDataStatus = "error";
        });
    },
});

export const { adicionaCliente, editClient } = clientsDataSlice.actions;

export default clientsDataSlice;
