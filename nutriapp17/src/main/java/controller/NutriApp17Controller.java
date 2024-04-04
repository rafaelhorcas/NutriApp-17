@Controller
@RequestMapping
public class TFGController {
@GetMapping("/") // filtro: recibir autenticación -vista: lista
@GetMapping("/login") // filtro: recibir autenticación -vista: lista
@GetMapping("/crear") // crear un nuevo TFG -vista:formulario
@PostMapping("/guardar") // guardar un TFG -crea/actualiza -vista:lista
@GetMapping("/editar/{id}") // editar ese TFG -lee -vista:formulario
@GetMapping("/eliminar/{id}") // eliminar ese TFG -elimina -vista:lista
@GetMapping("/lista") // lista de TFGs -lee todos -vista:lista
@GetMapping("/aceptar/{id}") // aceptar una propuesta TFG -actualiza -vista:lista
@PostMapping("/upload") // subir la memoria -actualiza -vista:lista
}