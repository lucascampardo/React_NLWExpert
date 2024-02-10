import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

interface NoteCardProps {
  note: {
    date: Date;
    content: string;
  };
}

function handleDeleteNote(event: FormEvent) {
  event.preventDefault();

  toast.success("Nota excluída com sucesso!");
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-line-400">
        <span className="text-sm font-medium text-slate-200">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>

        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"></Dialog.Overlay>
        <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleDeleteNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                {" "}
                {formatDistanceToNow(note.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>

              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group hover:bg-red-700"
            >
              Deseja{" "}
              <span className="text-red-300 group-hover:underline">
                apagar essa nota
              </span>
              ?
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
