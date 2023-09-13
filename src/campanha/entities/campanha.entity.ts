export interface Campanha {
  id: number;
  tipo: string;
  dias: Array<string>;
  horario: string;
  limite_corridas_ignoradas: number;
  limite_corridas_recusadas: number;
  tempo_de_tolerancia: number;
  periodo: string;
  descricao: string;
  ativa: boolean;
}
