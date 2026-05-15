import React, { useState, useEffect } from "react";
import {
} from "react-native";

// minha api
const URL_BASE = "https://olhosdagua.onrender.com/api";
const CHAVE_API =
  "6uztY7YTa2Dcgnf2ovDC2Kqmwvq2PdTMOlkx1bLwmhO2HQpQoXHMhk1cBcIjzHj9lztTbW7I83UZ91C8uSos-n8kOx3UuqU8n0BIDVm1venccSH0QVyNYKkLTZboaUpd";

// chave da equipe do arthur (ratsjs)
const CHAVE_RATS =
  "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function TelaInicial() {
    const [ setProjeto] = useState(null);


    useEffect(() => {
        buscarDados();
    }, []);

    async function buscarDados() {
        // projeto
        const resp = await fetch(URL_BASE + "/projeto", {
            headers: { "x-api-key": CHAVE_API },
        });
        const data = await resp.json();
        setProjeto(data[0]);
    }
}
