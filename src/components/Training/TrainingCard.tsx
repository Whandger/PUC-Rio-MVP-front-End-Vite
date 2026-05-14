import { useState } from "react";
import type { Training, ExerciseFormData, ExercicioJSON } from "../../types";
import ExerciseRow from "./ExerciseRow";
import { useExerciciosData } from "../../hooks/useExerciciosData";
import AddEXButton from "../shared/AddEXButton";
import ModalExercicioJson from "../shared/ExercicioJsonModal";

interface Props {
  training: Training;
  onDelete: (id: number) => void;
  onUpdateTraining: (
    id: number,
    data: { nome: string; exercicios: ExerciseFormData[] },
  ) => void;
}

export default function TrainingCard({
  training,
  onDelete,
  onUpdateTraining,
}: Props) {
  const baseUrl = import.meta.env.BASE_URL;
  const exerciciosData = useExerciciosData();

  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableTraining, setEditableTraining] = useState<Training>(() => ({
    ...training,
  }));

  // Modal para detalhes do exercício
  const [modalExercise, setModalExercise] = useState<ExercicioJSON | null>(
    null,
  );

  // Iniciar edição: copia o treino atual para o estado local
  const startEditing = () => {
    setEditableTraining({
      ...training,
      exercicios: training.exercicios.map((ex) => ({ ...ex })),
    });
    setIsEditing(true);
  };

  // Salvar edição
  const saveEditing = () => {
    onUpdateTraining(training.id, {
      nome: editableTraining.nome,
      exercicios: editableTraining.exercicios,
    });
    setIsEditing(false);
  };

  // Cancelar edição (ao clicar no header para colapsar, se estiver editando)
  const handleToggleExpand = () => {
    if (isEditing) {
      if (confirm("Descartar alterações?")) {
        setIsEditing(false);
        setExpanded(!expanded);
      }
    } else {
      setExpanded(!expanded);
    }
  };

  // Atualiza um campo de um exercício durante a edição
  const updateEditableExercise = (
    index: number,
    field: keyof ExerciseFormData,
    value: string,
  ) => {
    setEditableTraining((prev) => {
      const newExs = [...prev.exercicios];
      newExs[index] = { ...newExs[index], [field]: value };
      return { ...prev, exercicios: newExs };
    });
  };

  // Remove um exercício durante a edição
  const removeEditableExercise = (index: number) => {
    setEditableTraining((prev) => ({
      ...prev,
      exercicios: prev.exercicios.filter((_, i) => i !== index),
    }));
  };

  // Abre modal com detalhes do exercício do JSON
  const openExerciseModal = (jsonId?: string) => {
    if (!jsonId) return;
    const found = exerciciosData.find((e) => e.exerciseId === jsonId);
    if (found) setModalExercise(found);
  };

  // Adiciona um novo exercício vazio durante a edição
  const addEmptyExercise = () => {
    setEditableTraining((prev) => ({
      ...prev,
      exercicios: [
        ...prev.exercicios,
        { nomeExercicio: "", serie: "", repeticoes: "", peso: "" },
      ],
    }));
  };

  // Determina o músculo inicial a partir do jsonId (para o ExerciseRow)
  const getInitialMuscle = (ex: ExerciseFormData): string | undefined => {
    if (!ex.jsonId) return undefined;
    const jsonEx = exerciciosData.find((e) => e.exerciseId === ex.jsonId);
    if (jsonEx && jsonEx.musculoAlvo.length > 0) {
      return jsonEx.musculoAlvo[0]; // primeiro músculo alvo
    }
    return undefined;
  };

  return (
    <div className="w-[92%] bg-white rounded-lg shadow border border-[#3498db] overflow-hidden transition-all">
      {/* Cabeçalho */}
      <div
        onClick={handleToggleExpand}
        className={`flex justify-between items-center px-4 py-3 cursor-pointer ${
          expanded
            ? "bg-[#e9e9e9] rounded-t-lg border-b border-[#3498db]"
            : "bg-[#f9f9f9] rounded-lg"
        }`}
      >
        {isEditing ? (
          <input
            className="font-bold text-[#2c3e50] border-b-2 border-[#3498db] outline-none bg-transparent"
            value={editableTraining.nome}
            onChange={(e) =>
              setEditableTraining((prev) => ({ ...prev, nome: e.target.value }))
            }
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="font-bold text-[#2c3e50]">{training.nome}</span>
        )}
        <span className="bg-[#3498db] text-white text-xs px-3 py-1 rounded-full">
          {training.exercicios.length} exercícios
        </span>
      </div>

      {/* Conteúdo expandido */}
      {expanded && (
        <div className="border-t-2 border-[#3498db]">
          {/* Cabeçalho da tabela */}
          {isEditing ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#34495e] text-white font-bold text-sm">
              <span className="w-20 sm:w-24 text-center">Músculo</span>
              <span className="flex-1">Exercício</span>
              <span className="w-12 text-center">Séries</span>
              <span className="w-12 text-center">Reps</span>
              <span className="w-12 text-center">Peso</span>
              <span className="w-6"></span> {/* espaço da lixeira */}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#34495e] text-white font-bold text-sm">
              <span className="flex-1">Exercício</span>
              <span className="w-12 text-center">Séries</span>
              <span className="w-12 text-center">Reps</span>
              <span className="w-12 text-center">Peso</span>
              <span className="w-6"></span>
            </div>
          )}

          {/* Lista de exercícios */}
          {isEditing ? (
            // MODO EDIÇÃO
            <div className="flex flex-col gap-2 px-4 py-2">
              {editableTraining.exercicios.map((ex, idx) => (
                <ExerciseRow
                  key={idx}
                  values={ex}
                  exerciciosData={exerciciosData}
                  onChange={(field, value) =>
                    updateEditableExercise(idx, field, value)
                  }
                  showDelete={true}
                  onDelete={() => removeEditableExercise(idx)}
                  initialMuscle={getInitialMuscle(ex)}
                  initialExerciseId={ex.jsonId}
                />
              ))}
              <AddEXButton onClick={addEmptyExercise} />
            </div>
          ) : (
            // MODO VISUALIZAÇÃO
            <div>
              {training.exercicios.map((ex) => (
                <div
                  key={ex.id}
                  className="flex items-center gap-2 px-4 py-2 border-b border-gray-200"
                >
                  <span
                    className={`flex-1 truncate ${ex.jsonId ? "text-blue-600 cursor-pointer hover:underline" : ""}`}
                    onClick={() => ex.jsonId && openExerciseModal(ex.jsonId)}
                  >
                    {ex.nomeExercicio || "Sem nome"}
                  </span>
                  <span className="w-12 text-center">{ex.serie || "0"}</span>
                  <span className="w-12 text-center">
                    {ex.repeticoes || "0"}
                  </span>
                  <span className="w-12 text-center">
                    {ex.peso ? `${ex.peso} kg` : "-"}
                  </span>
                  <span className="w-6"></span> {/* espaço da lixeira */}
                </div>
              ))}
            </div>
          )}

          {/* Footer com ações (lápis/lixeira/check) */}
          <div className="flex gap-2 px-4 py-2 items-center justify-end border-t border-gray-200">
            <div className="justify-self-center flex items-center gap-2">
              {!isEditing ? (
                <span className="cursor-pointer" onClick={() => startEditing()}>
                  🖊
                </span>
              ) : (
                <>
                  <img
                    src={`${baseUrl}trash_icon.svg`}
                    alt="Excluir treino"
                    className="h-6 w-6 opacity-60 cursor-pointer hover:opacity-100"
                    onClick={() => onDelete(training.id)}
                  />
                  <span className="cursor-pointer" onClick={saveEditing}>
                    ✔️
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalhes do exercício */}
      <ModalExercicioJson
        exercise={modalExercise}
        onClose={() => setModalExercise(null)}
      />
    </div>
  );
}
