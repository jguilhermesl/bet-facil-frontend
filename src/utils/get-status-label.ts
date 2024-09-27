export const getStatusLabel = (value: string) => {
  const status = [
    {
      value: 'completed',
      label: 'Completo',
    },
    {
      value: 'processing',
      label: 'Processando...',
    },
    {
      value: 'error',
      label: 'Falhou',
    },
  ];

  return status.find((s) => s.value === value)?.label;
};