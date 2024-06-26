package es.isst.controller;

import java.lang.System.Logger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import es.isst.model.Alimento;
import es.isst.model.LoginRequest;
import es.isst.model.RegistroAlimento;
import es.isst.model.Usuario;
import es.isst.repository.AlimentoRepository;
import es.isst.repository.RegistroAlimentoRepository;
import es.isst.repository.UsuarioRepository;

@CrossOrigin(origins = "http://localhost:3000/")
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

  // FUNCIONES DE USUARIOS

  @GetMapping("/usuarios")
  public ResponseEntity<List<Usuario>> obtenerUsuarios() {
      List<Usuario> usuarios = (List<Usuario>) usuarioRepository.findAll();
      return new ResponseEntity<>(usuarios, HttpStatus.OK);
  }

  @GetMapping("/usuarios/{email}")
  public ResponseEntity<Usuario> obtenerUsuarioPorEmail(@PathVariable String email) {
    Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
    if (usuarioOptional.isPresent()) {
        Usuario usuario = usuarioOptional.get();
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  
  @GetMapping("/usuarios/{email}/espremium")
  public ResponseEntity<Boolean> verificarPremium(@PathVariable String email) {
      // Buscar el usuario por su nombre de usuario
      Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
      if (!usuarioOptional.isPresent()) {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Usuario no encontrado
      }
      // Verificar si el usuario es premium
      boolean esPremium = usuarioOptional.get().getEspremium();
      return new ResponseEntity<>(esPremium, HttpStatus.OK);
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

  @PostMapping("/inicio")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Buscar el usuario por su correo electrónico en la base de datos
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        if (!usuario.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

       // Crear un mapa con los datos del usuario
        Map<String, Object> userData = new HashMap<>();
        userData.put("email", usuario.getEmail());
        userData.put("esPremium", usuario.getEspremium());

        // Si las credenciales son correctas, devolver una respuesta exitosa junto con los datos del usuario
        return ResponseEntity.ok(userData); 
    }

  //FUNCIONES DE ALIMENTOS
  
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

  //FUNCIONES DE REGISTROALIMENTO

  @GetMapping("/registrosAlimentos")
  public ResponseEntity<List<RegistroAlimento>> obtenerRegistrosAlimentos() {
      List<RegistroAlimento> registros = (List<RegistroAlimento>) registroalimentoRepository.findAll();
      return new ResponseEntity<>(registros, HttpStatus.OK);
  }

  @GetMapping("/registrosAlimentos/{id}")
  public ResponseEntity<RegistroAlimento> obtenerRegistroAlimentoPorId(@PathVariable Integer id) {
      Optional<RegistroAlimento> registroAlimentoOptional = registroalimentoRepository.findById(id);
      if (registroAlimentoOptional.isPresent()) {
          RegistroAlimento registroAlimento = registroAlimentoOptional.get();
          return new ResponseEntity<>(registroAlimento, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  }

   /**
   * @brief Devuelve los elementos RegistroAlimento para un usuario (email) y una fecha (día actual)
   * @param email Email del usuario
   * @param fecha Fecha del día actual
   * @return
   */
  @GetMapping("/registroDiario/{email}")
  public ResponseEntity<List<RegistroAlimento>> obtenerAlimentosPorUsuarioYFecha(@PathVariable String email, @RequestParam String fecha) {
    // Verificar si la fecha está en el formato correcto
    if (!fecha.matches("\\d{2}-\\d{2}-\\d{4}")) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
    if (usuarioOptional.isPresent()) {
        Usuario usuario = usuarioOptional.get();
        List<RegistroAlimento> registros = registroalimentoRepository.findByUsuarioAndFecha(usuario, fecha);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
  
  @GetMapping("/registroSemanal/{email}")
  public ResponseEntity<List<RegistroAlimento>> obtenerAlimentosSemanaPorUsuarioYFecha(@PathVariable String email, @RequestParam String fecha) {

    // Verificar si la fecha está en el formato correcto
    if (!fecha.matches("\\d{2}-\\d{2}-\\d{4}")) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    // Obtenemos fecha 7 dias antes    
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    LocalDate fechaActual = LocalDate.parse(fecha, formatter);
    LocalDate fecha7DiasAntes = fechaActual.minusDays(7);
    List<RegistroAlimento> registros = new ArrayList<>();
    Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
    if (usuarioOptional.isPresent()) {
        Usuario usuario = usuarioOptional.get();
        for (LocalDate fechaConsulta = fecha7DiasAntes; fechaConsulta.isBefore(fechaActual.plusDays(1)); fechaConsulta = fechaConsulta.plusDays(1)) {
            List<RegistroAlimento> registrosDia = registroalimentoRepository.findByUsuarioAndFecha(usuario, fechaConsulta.format(formatter));
            registros.addAll(registrosDia);
        }
        return new ResponseEntity<>(registros, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
}

  @GetMapping("/registroMensual/{email}")
  public ResponseEntity<List<List<RegistroAlimento>>> obtenerAlimentosMensualPorUsuarioYFecha(@PathVariable String email, @RequestParam String fecha) {
      // Verificar si la fecha está en el formato correcto
      if (!fecha.matches("\\d{2}-\\d{2}-\\d{4}")) {
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
  
      Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
      if (usuarioOptional.isPresent()) {
          Usuario usuario = usuarioOptional.get();
          // Verificar si el usuario es premium
          if (!usuario.getEspremium()) {
              // Si el usuario no es premium, no se devuelve la lista de registros
              return new ResponseEntity<>(HttpStatus.FORBIDDEN);
          }
          // Obtener fecha 30 días antes
          DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
          LocalDate fechaActual = LocalDate.parse(fecha, formatter);
          LocalDate fecha30DiasAntes = fechaActual.minusDays(30);

          // Obtener los registros mensuales
          List<List<RegistroAlimento>> registrosMensuales = new ArrayList<>();
          for (int i = 0; i < 30; i++) {
              LocalDate fechaIterada = fecha30DiasAntes.plusDays(i);
              LocalDate fechaSiguiente = fechaIterada.plusDays(1);
              List<RegistroAlimento> registrosDia = registroalimentoRepository.findByUsuarioAndFechaBetween(usuario, fechaIterada.format(formatter), fechaSiguiente.minusDays(1).format(formatter)); 
              registrosMensuales.add(registrosDia);
          }
  
          return new ResponseEntity<>(registrosMensuales, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
  }

  @GetMapping("/registroHistorico/{email}")
  public ResponseEntity<List<RegistroAlimento>> obtenerAlimentosPorUsuario(@PathVariable String email) {
    
    Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
    if (usuarioOptional.isPresent()) {
        Usuario usuario = usuarioOptional.get();
        List<RegistroAlimento> registros = registroalimentoRepository.findByUsuario(usuario);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/registroAlimentos")
  public ResponseEntity<RegistroAlimento> crearRegistroAlimento(@RequestBody RegistroAlimento registroAlimento) {
      RegistroAlimento nuevoRegistro = registroalimentoRepository.save(registroAlimento);
      return new ResponseEntity<>(nuevoRegistro, HttpStatus.CREATED);
  }

 @PutMapping("/registroAlimentos/{id}")
  public ResponseEntity<String> actualizarCantidadRegistroAlimento(@PathVariable Long id, @RequestBody Double cantidad) {

    System.out.println("Registro de alimento encontrado: " + cantidad);
    Optional<RegistroAlimento> registroAlimentoOptional = registroalimentoRepository.findById(id); // Buscar el registro de alimento por su ID
    
      if (!registroAlimentoOptional.isPresent()) { // Verifica si el objeto está presente en el Optional
         return new ResponseEntity<>("El registro de alimento no se encontró", HttpStatus.NOT_FOUND);
      }
    
      RegistroAlimento registroAlimento = registroAlimentoOptional.get(); // Obtiene el objeto RegistroAlimento del Optional
      // Actualizar el atributo cantidad del registro de alimento con el nuevo valor
      registroAlimento.setCantidad(cantidad);
        
      // Guardar los cambios en la base de datos
      registroalimentoRepository.save(registroAlimento);
    
      return new ResponseEntity<>("Cantidad del registro de alimento actualizada exitosamente", HttpStatus.OK); 
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
}



