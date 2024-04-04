import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping
public class TFGController {
@GetMapping("/") // filtro: recibir autenticación -vista: lista
@GetMapping("/login") // filtro: recibir autenticación -vista: lista
@GetMapping("/crear") // crear un nuevo TFG -vista:formulario
@GetMapping("/registar")
public String registar(Map<String, Object> model) {
Alimento Alimento  = new Alimento ();
model.put("Alimento ", Alimento );
model.put("accion", "guardar");
return VISTA_FORMULARIO;
}
@PostMapping("/registrado")
public Alimento registrado(Alimento alimento) {
return alimento;
}
@PostMapping("/guardar") // guardar un TFG -crea/actualiza -vista:lista
@GetMapping("/editar/{id}") // editar ese TFG -lee -vista:formulario
@GetMapping("/eliminar/{id}") // eliminar ese TFG -elimina -vista:lista
@GetMapping("/lista") // lista de TFGs -lee todos -vista:lista
@GetMapping("/aceptar/{id}") // aceptar una propuesta TFG -actualiza -vista:lista
@PostMapping("/upload") // subir la memoria -actualiza -vista:lista
}