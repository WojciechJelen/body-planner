/**
 * @fileoverview Definicje typów TypeScript dla struktury mezocyklu treningowego.
 * @author Wojciech Jelen (AI)
 * @version 1.0.0
 */

/**
 * Definiuje możliwe metody specjalne stosowane w grupach ćwiczeń.
 * Zapewnia type safety i podpowiedzi w edytorze.
 */
export type ExerciseMethod =
  | "Standard"
  | "Superseria"
  | "Giant Set"
  | "Tri-Set"
  | "Drop Set";

/**
 * Reprezentuje pojedyncze ćwiczenie w planie treningowym.
 */
export interface ExerciseDetail {
  /** Unikalny identyfikator ćwiczenia w ramach grupy (np. "A1", "B2", "C"). */
  exercise_id: string;
  /** Pełna nazwa ćwiczenia. */
  name: string;
  /** Liczba serii do wykonania. */
  sets: number;
  /**
   * Zakres powtórzeń lub specyficzna instrukcja (np. "10-12", "6-8", "AMRAP >8").
   * Używamy typu string, aby obsłużyć zakresy i specjalne adnotacje.
   */
  reps: string;
  /**
   * Tempo wykonania ćwiczenia w formacie 4-cyfrowym (Ekscentryka, Pauza dół, Koncentryka, Pauza góra).
   * X oznacza ruch eksplozywny. (np. "4010", "31X0").
   */
  tempo: string;
  /**
   * Czas odpoczynku po wykonaniu ćwiczenia lub całej grupy (w zależności od metody).
   * (np. "75s", "120s").
   */
  rest: string;
  /** Dodatkowe uwagi lub wskazówki dotyczące wykonania ćwiczenia (opcjonalne). */
  notes?: string;
}

/**
 * Grupuje jedno lub więcej ćwiczeń, które mogą być wykonywane
 * w ramach określonej metody specjalnej (np. superseria, giant set).
 */
export interface ExerciseGroup {
  /** Identyfikator grupy ćwiczeń (np. "A", "B", "A1-A3"). */
  group_id: string;
  /** Metoda specjalna zastosowana dla tej grupy ćwiczeń. */
  method: ExerciseMethod | string; // Używamy `| string` dla elastyczności, jeśli pojawią się niestandardowe metody
  /** Lista ćwiczeń należących do tej grupy. */
  exercises: ExerciseDetail[];
}

/**
 * Reprezentuje pojedynczy dzień treningowy w ramach tygodniowego splitu.
 */
export interface WorkoutDay {
  /** Numer dnia treningowego w tygodniu (np. 1, 2, 4). */
  day_number: number;
  /** Główny cel lub partie mięśniowe trenowane tego dnia (np. "Klatka Piersiowa & Plecy"). */
  focus: string;
  /** Lista grup ćwiczeń zaplanowanych na ten dzień. */
  exercise_groups: ExerciseGroup[];
}

/**
 * Reprezentuje pojedynczą fazę mezocyklu treningowego (np. Akumulacja, Intensyfikacja).
 */
export interface TrainingPhase {
  /** Numer porządkowy fazy w mezocyklu. */
  phase_number: number;
  /** Nazwa fazy (np. "Akumulacja 1"). */
  name: string;
  /** Zakres tygodni, w których obowiązuje dana faza (np. "1-4"). */
  weeks: string;
  /** Główny cel treningowy tej fazy. */
  goal: string;
  /** Dodatkowe uwagi dotyczące całej fazy (opcjonalne). */
  notes?: string;
  /** Rozkład dni treningowych w tygodniu dla tej fazy. */
  weekly_split: WorkoutDay[];
}

/**
 * Główny interfejs reprezentujący cały mezocykl treningowy.
 * Zawiera metadane oraz poszczególne fazy treningowe.
 */
export interface Mesocycle {
  /** Nazwa całego planu treningowego. */
  name: string;
  /** Główny cel mezocyklu (np. "Hipertrofia (Masa mięśniowa)"). */
  goal: string;
  /** Całkowity czas trwania mezocyklu w tygodniach. */
  duration_weeks: number;
  /** Opis filozofii lub głównych założeń planu. */
  philosophy: string;
  /** Opis ogólnej struktury tygodnia treningowego. */
  weekly_structure: string;
  /** Wprowadzenie lub wstępne uwagi do planu. */
  introduction: string;
  /** Lista końcowych, ważnych uwag dotyczących realizacji planu. */
  final_notes: string[];
  /** Tablica zawierająca wszystkie fazy treningowe mezocyklu. */
  phases: TrainingPhase[];
}
