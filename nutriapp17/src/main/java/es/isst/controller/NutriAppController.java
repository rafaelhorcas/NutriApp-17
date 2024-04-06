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
import org.springframework.data.repository.CrudRepository;

@Controller
@RequestMapping
public class NutriAppController {

  private final AlimentoRepository alimentoRepository;
  private final RegistroAlimentoRepository registroalimentoRepository;
  private final UsuarioRepository usuarioRepository;  
  public static final Logger log = LoggerFactory.getLogger(NutriAppController.class);
  
  public TFGController(AlimentoRepository a, RegistroAlimentoRepository r, UsuarioRepository u) {
    this.alimentoRepository = a;
    this.sregistroalimentoRepository = r;
    this.usuarioRepository = u;  
  } 
  
@GetMapping("/") // filtro: recibir autenticación -vista: lista
@GetMapping("/registro") // crear un nuevo TFG -vista:formulario
@GetMapping("/nuevoalimento") // editar ese TFG -lee -vista:formulario
@GetMapping("/habitos") // lista de TFGs -lee todos -vista:lista
@GetMapping("/nuevo") // aceptar una propuesta TFG -actualiza -vista:lista




