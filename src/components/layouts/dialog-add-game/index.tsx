import Image from 'next/image';
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { FormInputField } from '@/components/form-input-field';
import { useMutation } from '@tanstack/react-query';
import { addGame } from '@/api/games/add-game';
import { queryClient } from '@/services/react-query';
import { Spinner } from '@/components/ui/spinner';

export const DialogAddGame = () => {
  const { mutateAsync: addGameFn, isPending } = useMutation({
    mutationFn: addGame,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      });
    },
  });

  const handleAddGame = () => {
    try {
      addGameFn({
        gameId: values.flashScoreId,
      });
    } catch (err) {
      console.log(err);
      alert('Algo deu errado');
    }
  };

  const { handleSubmit, setFieldValue, values, getFieldProps } = useFormik({
    initialValues: {
      flashScoreId: '',
    },
    onSubmit: handleAddGame,
  });

  return (
    <DialogContent className="max-w-[400px] w-full">
      <DialogHeader>
        <DialogTitle>
          <Heading className="text-base">Adicionar nova partida</Heading>
        </DialogTitle>
      </DialogHeader>
      <form
        className="flex flex-col justify-between items-end mt-4"
        onSubmit={handleSubmit}
      >
        <FormInputField
          {...getFieldProps('flashScoreId')}
          onChange={(e) => setFieldValue('flashScoreId', e.target.value)}
          label="Id no FlashScore"
          placeholder="X87bbca1"
          className="w-full"
        />

        {isPending ? (
          <Spinner />
        ) : (
          <Button
            type="submit"
            className="bg-primary ml-auto mt-6"
            disabled={isPending}
          >
            Iniciar processamento
          </Button>
        )}
      </form>
    </DialogContent>
  );
};
