class ToolBoxService {
  /**
   * Détermine si une chaîne de caractères est null, vide ou se compose uniquement d'espaces blancs.
   * @param str La chaîne de caractères à tester
   */
  public static stringIsNullOrWhiteSpace(str: string | null | undefined) {
    return !str || str.match(/^ *$/) !== null || str === '';
  }
}

export default ToolBoxService;
