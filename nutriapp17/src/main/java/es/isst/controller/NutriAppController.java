package es.isst.controller;

import java.lang.System.Logger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import es.isst.model.Alimento;
import es.isst.model.RegistroAlimento;
import es.isst.model.Usuario;
import es.isst.repository.AlimentoRepository;
import es.isst.repository.RegistroAlimentoRepository;
import es.isst.repository.UsuarioRepository;

@Controller
@RequestMapping
public class NutriAppController {

  private final AlimentoRepository alimentoRepository;
  private final RegistroAlimentoRepository registroalimentoRepository;
  private final UsuarioRepository usuarioRepository;  
  //public static final Logger log = LoggerFactory.getLogger(NutriAppController.class);
  
  public NutriAppController(AlimentoRepository a, RegistroAlimentoRepository r, UsuarioRepository u) {
    this.alimentoRepository = a;
    this.registroalimentoRepository = r;
    this.usuarioRepository = u;  
  }

   
    @GetMapping("/alimentos")
    public ResponseEntity<List<Alimento>> obtenerAlimentos() {
        List<Alimento> alimentos = (List<Alimento>) alimentoRepository.findAll();
        return new ResponseEntity<>(alimentos, HttpStatus.OK);
    }

    @GetMapping("/alimentos/{nombre}")
    public ResponseEntity<List<Alimento>> obtenerAlimentosPorNombre(@PathVariable String nombre) {
        List<Alimento> alimentos = alimentoRepository.findByNombre(nombre);
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
        List<RegistroAlimento> registros = (List<RegistroAlimento>) registroalimentoRepository.findAll();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/registrosAlimentos/{id}")
    public ResponseEntity<List<RegistroAlimento>> obtenerRegistrosAlimentosPorId(@PathVariable Integer id) {
        List<RegistroAlimento> registros = registroalimentoRepository.findById(id);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @PostMapping("/registrosAlimentos")
    public ResponseEntity<RegistroAlimento> crearRegistroAlimento(@RequestBody RegistroAlimento registroAlimento) {
        RegistroAlimento nuevoRegistro = registroalimentoRepository.save(registroAlimento);
        return new ResponseEntity<>(nuevoRegistro, HttpStatus.CREATED);
    }

     @DeleteMapping("/registrosAlimentos/{id}")
    public ResponseEntity<String> eliminarRegistroAlimento(@PathVariable Integer id) {
        if (registroalimentoRepository.existsById(id)) {
            registroalimentoRepository.deleteById(id);
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
 /*   public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@PathVariable String email) {
        Optional<Usuario> usuario = usuarioRepository.findByUsuario(email);
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    } */

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

    /**
     * @brief Devuelve los elementos RegistroAlimento para un usuario (email) y una fecha (día actual)
     * @param email Email del usuario
     * @param fecha Fecha del día actual
     * @return
     */
    @GetMapping("/registroDiario")
    public List<RegistroAlimento> obtenerAlimentosPorUsuarioYFecha(@RequestParam String email, @RequestParam Date fecha){
        return registroalimentoRepository.findByUsuarioAndFecha(email, fecha);
    }
    






  
  
/*@GetMapping("/") // filtro: recibir autenticación -vista: lista
@GetMapping("/registro") // crear un nuevo TFG -vista:formulario
@GetMapping("/nuevoalimento") // editar ese TFG -lee -vista:formulario
@GetMapping("/habitos") // lista de TFGs -lee todos -vista:lista
@GetMapping("/nuevo") // aceptar una propuesta TFG -actualiza -vista:lista*/
}



