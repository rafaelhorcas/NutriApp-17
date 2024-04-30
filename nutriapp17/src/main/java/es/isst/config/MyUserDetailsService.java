package es.isst.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import es.isst.model.Usuario;
import es.isst.repository.UsuarioRepository;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email){
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            List<GrantedAuthority> authorities = new ArrayList<>();
            if (usuario.getEspremium()) {
                authorities.add(new SimpleGrantedAuthority("ROLE_PREMIUM"));
            } else {
                authorities.add(new SimpleGrantedAuthority("ROLE_ESTANDAR"));
            }
            return new User(usuario.getEmail(), usuario.getPassword(), authorities);
    } else {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
    }
    
}
