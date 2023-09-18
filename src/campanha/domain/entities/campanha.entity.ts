export interface Campanha {
  tipo: string;
  dias: Array<string>;
  horario_inicial: string;
  horario_final: string;
  limite_corridas_ignoradas: number;
  limite_corridas_recusadas: number;
  tempo_de_tolerancia: string;
  descricao: string;
  ativa: boolean;
}
