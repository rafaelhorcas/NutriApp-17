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
public class NutriAppController {
@GetMapping("/") // filtro: recibir autenticación -vista: lista
@GetMapping("/login") // filtro: recibir autenticación -vista: lista
@GetMapping("/crear") // crear un nuevo TFG -vista:formulario
@PostMapping("/guardar") // guardar un TFG -crea/actualiza -vista:lista
@GetMapping("/editar/{id}") // editar ese TFG -lee -vista:formulario
@GetMapping("/lista") // lista de TFGs -lee todos -vista:lista
@GetMapping("/aceptar/{id}") // aceptar una propuesta TFG -actualiza -vista:lista
@PostMapping("/upload") // subir la memoria -actualiza -vista:lista

@GetMapping("/registar")
@PostMapping("/registrado")
@GetMapping("/eliminar/{id}") 


public String registar(Map<String, Object> model) {
registroAlimento registroalimento  = new RegistroAlimento ();
model.put("registroalimento ", registroalimento );
model.put("accion", "registrado");
return VISTA_FORMULARIO;
}

public void registrado() {
return "redirect:" + VISTA_LISTA;
}

public String eliminar(@PathVariable(value = "id") String id) {
// TODO comprobar que el usuario tiene permisos para eliminar
restTemplate.delete(TFGMANAGER_STRING + "/" + id);
return "redirect:/" + VISTA_LISTA;
}


/**return alimento;*/
}

/** public void registrarAlimento(Usuario usuario, int alimentoId, Double cantidad, Date fecha) {
        // Aquí puedes implementar la lógica para registrar el alimento asociado al usuario
        // Por ejemplo, podrías recuperar el alimento de la base de datos
        
        // Suponiendo que tienes una clase para interactuar con la base de datos
        AlimentoDAO alimentoDAO = new AlimentoDAO(); // Suponiendo que tienes una clase AlimentoDAO para interactuar con la base de datos
        Alimento alimento = alimentoDAO.obtenerAlimentoPorId(alimentoId);
        
        if (alimento != null) {
            // Crear un nuevo registro de alimento
            RegistroAlimento registroAlimento = new RegistroAlimento();
            registroAlimento.setAlimento(alimento);
            registroAlimento.setCantidad(cantidad);
            registroAlimento.setFecha(fecha);
            
            // Asignar el usuario al registro de alimento
            registroAlimento.setUsuario(usuario);
            
            // Aquí podrías guardar este registro en una base de datos o realizar otras acciones necesarias
            // Por simplicidad, se asume que hay métodos setter para los campos en las clases respectivas
            
            // Ejemplo de guardar en una base de datos (suponiendo que haya una clase para interactuar con la base de datos)
            // registroAlimentoDAO.save(registroAlimento);
            
            // También podrías realizar otras acciones, como actualizar el registro del usuario con la información del alimento consumido, etc.
            
            System.out.println("Alimento registrado para el usuario: " + usuario.getEmail());
        } else {
            System.out.println("No se encontró el alimento con el ID proporcionado.");
        }
    }
*/ 