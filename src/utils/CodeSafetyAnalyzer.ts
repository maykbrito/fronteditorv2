/**
 * Utilitário simples para detectar loops infinitos óbvios
 */

export interface SafetyCheck {
  isSafe: boolean;
  message?: string;
}

export class SimpleLoopDetector {
  private static readonly INFINITE_LOOP_PATTERNS = [
    /while\s*\(\s*true\s*\)/gi,
    /for\s*\(\s*;\s*;\s*\)/gi,
    /while\s*\(\s*1\s*\)/gi,
  ];

  /**
   * Verifica se o código contém loops infinitos óbvios
   */
  static checkCode(code: string): SafetyCheck {
    if (!code || !code.trim()) {
      return { isSafe: true };
    }

    // Remove comentários
    const cleanCode = code
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');

    // Verifica padrões de loop infinito
    for (const pattern of this.INFINITE_LOOP_PATTERNS) {
      if (pattern.test(cleanCode)) {
        return {
          isSafe: false,
          message: 'Loop infinito detectado. O código foi pausado para evitar travamento.'
        };
      }
    }

    return { isSafe: true };
  }
}