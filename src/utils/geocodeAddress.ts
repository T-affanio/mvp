import axios from "axios";
import { AppError } from "../shared/err/error";

export async function geocodeAddress(address: string) {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
          countrycodes: "br",
        },
        headers: {
          "User-Agent": "hoodFood/1.0 (admin@hoodfood.com)", // 🔥 OBRIGATÓRIO
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new AppError(
        "Erro ao localizar endereço. Tente ser mais específico.",
        400
      );
    }

    return {
      lat: Number(response.data[0].lat),
      lng: Number(response.data[0].lon),
    };
  } catch (err) {
    throw new AppError("Erro ao localizar endereço", 400);
  }
}
