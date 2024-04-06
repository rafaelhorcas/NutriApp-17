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

   
    @GetMapping("/alimentos")
    public ResponseEntity<List<Alimento>> obtenerAlimentos() {
        List<Alimento> alimentos = (List<Alimento>) alimentoRepository.findAll();
        return new ResponseEntity<>(alimentos, HttpStatus.OK);
    }

    @GetMapping("/alimentos/{nombre}")
    public ResponseEntity<List<Alimento>> obtenerAlimentosPorNombre(@PathVariable String nombre) {
        List<Alimento> alimentos = alimentoRepository.findByAlimento(nombre);
        return new ResponseEntity<>(alimentos, HttpStatus.OK);
    }

    @PostMapping("/alimentos")
    public ResponseEntity<Alimento> crearAlimento(@RequestBody Alimento alimento) {
        Alimento nuevoAlimento = alimentoRepository.save(alimento);
        return new ResponseEntity<>(nuevoAlimento, HttpStatus.CREATED);
    }

    @DeleteMapping("/alimentos/{id}")
    public ResponseEntity<String> eliminarAlimento(@PathVariable String id) {
        if (alimentoRepository.existsById(id)) {
            alimentoRepository.deleteById(id);
            return new ResponseEntity<>("Alimento eliminado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("El alimento no se encontró", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/registrosAlimentos")
    public ResponseEntity<List<RegistroAlimento>> obtenerRegistrosAlimentos() {
        List<RegistroAlimento> registros = (List<RegistroAlimento>) registroAlimentoRepository.findAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/registrosAlimentos/{id}")
    public ResponseEntity<List<RegistroAlimento>> obtenerRegistrosAlimentosPorId(@PathVariable Int id) {
        List<RegistroAlimento> registros = registroAlimentoRepository.findByRegistroAlimento(id);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PostMapping("/registrosAlimentos")
    public ResponseEntity<RegistroAlimento> crearRegistroAlimento(@RequestBody RegistroAlimento registroAlimento) {
        RegistroAlimento nuevoRegistro = registroAlimentoRepository.save(registroAlimento);
        return new ResponseEntity<>(nuevoRegistro, HttpStatus.CREATED);
    }

     @DeleteMapping("/registrosAlimentos/{id}")
    public ResponseEntity<String> eliminarRegistroAlimento(@PathVariable Integer id) {
        if (registroAlimentoRepository.existsById(id)) {
            registroAlimentoRepository.deleteById(id);
            return new ResponseEntity<>("Registro de alimento eliminado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("El registro de alimento no se encontró", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = (List<Usuario>) usuarioRepository.findAll();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/usuarios/{email}")
    public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@PathVariable String email) {
        Optional<Usuario> usuario = usuarioRepository.findByUsuario(email);
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @DeleteMapping("/usuarios/{email}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable String email) {
        if (usuarioRepository.existsById(email)) {
            usuarioRepository.deleteById(email);
            return new ResponseEntity<>("Usuario eliminado exitosamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("El usuario no se encontró", HttpStatus.NOT_FOUND);
        }
    }

    









  
  
@GetMapping("/") // filtro: recibir autenticación -vista: lista
@GetMapping("/registro") // crear un nuevo TFG -vista:formulario
@GetMapping("/nuevoalimento") // editar ese TFG -lee -vista:formulario
@GetMapping("/habitos") // lista de TFGs -lee todos -vista:lista
@GetMapping("/nuevo") // aceptar una propuesta TFG -actualiza -vista:lista
}



