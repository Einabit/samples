import com.einabit.client.EinabitClient;
import com.einabit.client.EinabitServerListener;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.concurrent.CompletableFuture;

public class Main {

  private static final String ENV_VARIABLES = "VARIABLES";
  private static final String ENV_<API_HOST> = "<API_HOST>";
  private static final String ENV_<API_KEY> = "<API_KEY>";
  private static final String ENV_DB_HOST = "DB_HOST";
  private static final String ENV_DB_USER = "DB_USER";
  private static final String ENV_DB_PASS = "DB_PASS";
  private static final String ENV_DB_NAME = "DB_NAME";

  public static void main(String[] args) {

    System.out.println("Starting app");

    String url = "jdbc:postgresql://" + System.getenv(ENV_DB_HOST) + ":5432/" + System.getenv(ENV_DB_NAME);
    final EinabitClient client = EinabitClient.builder().key(System.getenv(ENV_<API_KEY>)).host(System.getenv(ENV_<API_HOST>)).build();

    try {
      final Connection cn = DriverManager.getConnection(url, System.getenv(ENV_DB_PASS), System.getenv(ENV_DB_PASS));

      System.out.println("Looking for variables: " + System.getenv(ENV_VARIABLES));
      for (String auxvarname: System.getenv(ENV_VARIABLES).split(",")) {

        final Thread myCustomRunnable = new Thread(new MyRunnable(client, auxvarname, (String auxval) -> {
          String[] auxsplit = auxval.trim().split(",");

          try {
            Statement statement = cn.createStatement();

            String sql = "INSERT INTO iot_registry (name, ts, value) VALUES ('$1', $2, $3)";

            sql = sql.replace("$1", auxvarname);
            sql = sql.replace("$2", auxsplit[0]);
            sql = sql.replace("$3", auxsplit[1]);

            System.out.println("Executed sql statement: " + sql);
            statement.execute(sql);

          } catch (SQLException e) {
            e.printStackTrace();
          }

        }), "my-runnable-thread");

        System.out.println("Subscribed for changes on " + auxvarname);

        myCustomRunnable.start();
      }

    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  private record MyRunnable(EinabitClient client, String varname, EinabitServerListener listener) implements Runnable {

    @Override
    public void run() {
      System.out.println("Client.tap for " + varname);
      client.tap(varname, listener);
    }
  }
}
