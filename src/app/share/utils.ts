export class Utils {
  public static GetRandomOfArray(tab: any[]): any{
    return tab[Math.floor(Math.random() * tab.length)];
  }
}
